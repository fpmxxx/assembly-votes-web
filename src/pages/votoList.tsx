import { useEffect, useState } from "react"

import { Container, Table } from "react-bootstrap";

import api from '../utils/api';
import Pagination from "../components/pagination";
import { Voto } from "../types/voto";

export default function VotoList() {
    const [listVoto, setListVoto] = useState<Voto[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        debugger

        const getListVote = async () => {
            await api.get('/v1/voto/list', {
                params: {
                    page: pageNumber,
                    size: 5
                }
            })
                .then((res) => {
                    debugger
                    setTotalPage(res.data.totalPage);
                    setListVoto(res.data.listVotoDTO);
                })
                .catch(err => console.log(err.message));
        }

        getListVote();

    }, [pageNumber]);

    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }

    return (
        <Container>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Pauta</th>
                        <th>Voto</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {listVoto.map(voto =>
                        <tr key={voto.pautaId}>
                            <td>{voto.pauta}</td>
                            <td>{voto.voto ? 'Sim' : 'Não'}</td>
                            <td>{voto.quantidadeVotos}</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Pagination totalPage={totalPage} onChange={handlePageChange} />

        </Container>
    )
}