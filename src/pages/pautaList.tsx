import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { Container, Table } from "react-bootstrap";

import api from '../utils/api';
import { Pauta } from "../types/pauta"
import Pagination from "../components/pagination";


export default function PautaList() {
    const [listPauta, setListPauta] = useState<Pauta[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        debugger
        const getListStave = async () => {
            await api.get('/v1/pauta/list', {
                params: {
                    page: pageNumber,
                    size: 5
                }
            })
                .then((res) => {
                    setTotalPage(res.data.totalPage);
                    setListPauta(res.data.listPauta);
                })
                .catch(err => console.log(err.message));
        }

        getListStave();
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
                        <th>Votar</th>
                    </tr>
                </thead>
                <tbody>
                    {listPauta.map(pauta =>
                        <tr key={pauta.id}>
                            <td>{pauta.nome}</td>
                            <td><Link className="btn btn-success" to={`/vote/form/${pauta.id}/${pauta.nome}`}>Votar</Link></td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Pagination totalPage={totalPage} onChange={handlePageChange} />

        </Container>
    )
}