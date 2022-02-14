import { useEffect, useState } from "react"
import { Container, Table } from "react-bootstrap";

import api from '../utils/api';
import Loading from '../components/loading';
import Message from "../components/message";
import Pagination from "../components/pagination";
import { Voto } from "../types/voto";

export default function VotoList() {
    const [loading, setLoading] = useState({ showLoading: false});
    const [message, setMessage] = useState({ type: "", message: "" });

    const [listVoto, setListVoto] = useState<Voto[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const getListVote = async () => {
            setLoading({ showLoading: true });
            await api.get('/v1/voto/list', {
                params: {
                    page: pageNumber,
                    size: 5
                }
            })
                .then((res) => {
                    setTotalPage(res.data.totalPage);
                    setListVoto(res.data.listVoto);
                    setLoading({ showLoading: false });
                })
                .catch(err => {
                    const msg = { type: "danger", message: err.response ? JSON.stringify(err.response.data) : err.message };
                    setMessage(msg);
                    setLoading({ showLoading: false });
                });

        }

        getListVote();

    }, [pageNumber]);

    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }

    return (
        <>
            <Loading loading={loading} />
            <Message message={message} />

            <Container>
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th style={{ width: '60%' }}>Pauta</th>
                            <th style={{ width: '20%' }}>Voto</th>
                            <th style={{ width: '20%' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listVoto.map(voto =>
                            <tr key={voto.pautaId + '-' + voto.voto}>
                                <td>{voto.pauta}</td>
                                <td>{voto.voto ? 'Sim' : 'Não'}</td>
                                <td>{voto.quantidadeVotos}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <Pagination totalPage={totalPage} onChange={handlePageChange} />

            </Container>
        </>
    )
}