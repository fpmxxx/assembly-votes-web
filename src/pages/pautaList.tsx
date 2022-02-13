import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

import api from '../utils/api';
import Message from "../components/message";
import Pagination from "../components/pagination";
import { Pauta } from "../types/pauta"


export default function PautaList() {
    const [message, setMessage] = useState({ type: "", message: "" });
    const [listPauta, setListPauta] = useState<Pauta[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
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
                .catch(err => {
                    const msg = { type: "danger", message: err.response ? JSON.stringify(err.response.data) : err.message };
                    setMessage(msg);
                });
        }

        getListStave();
    }, [pageNumber]);

    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }

    return (
        <>
            {message ? <Message message={message} /> : ""}

            <Container>
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: '50%' }}>Pauta</th>
                            <th style={{ width: '50%' }}>Votar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPauta.map(pauta =>
                            <tr key={pauta.id}>
                                <td>{pauta.nome}</td>
                                <td><Link className="btn btn-success" to={`/voto/form/${pauta.id}/${pauta.nome}`}>Votar</Link></td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <Pagination totalPage={totalPage} onChange={handlePageChange} />

            </Container>
        </>
    )
}