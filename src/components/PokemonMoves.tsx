import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Backdrop, Box, Fade, IconButton, Modal, Typography } from "@mui/material";
import axios from 'axios';
import  { IconSearch }  from '../icons/IconSearch';
export const PokemonMoves = () => {
    let { state } = useLocation();
    const [pokeMoves, setPokeMoves] = useState([]);
    const [pokeMovesDetail, setPokeMovesDetail] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        color: "black"
      };

    useEffect(() => {
        if (state && state.pokeMoves) {
            const movementsMap = state.pokeMoves.map((data: { move: any; }, index: number) => {
                return {
                    id: index + 1,
                    name: data.move.name,
                    urlInfo: data.move.url
                };
            });
            setPokeMoves(movementsMap);
        }
    }, [state]);

    console.log("movements", pokeMoves)
    //console.log("after set", pokeMoves)

    const handleButtonClick = async (url: string) => {
        console.log("row", url)
        const response = await axios.get(url);
        const moveInfo = response.data;
        const pokeMoveInfo = {
            name: moveInfo.name,
            generation: moveInfo.generation.name,
            accuracy: moveInfo.accuracy,
            power: moveInfo.power,
            target: moveInfo.target.name,
            type: moveInfo.type.name
        }
        console.log("resp", moveInfo)
        console.log("pokeMoveInfo", pokeMoveInfo)
        //setOpen(true);
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Move', width: 150 },
        {
            field: 'option',
            headerName: 'Option',
            width: 130,
            renderCell: (params) => {
                return (
                    <IconButton color="primary" onClick={() => handleButtonClick(params.row.urlInfo)}>
                        <IconSearch />
                    </IconButton>
                );
            }
        },
    ];
    return (
        <>
            <h1>Hola</h1>
            <div style={{ height: '400', width: 'auto', backgroundColor: 'white' }}>
                <DataGrid
                    rows={pokeMoves}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
            {/* MODAL INFO MOVES POKEMON */}
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default PokemonMoves;