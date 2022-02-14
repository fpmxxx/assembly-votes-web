import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';

import api from '../utils/api';
import Loading from '../components/loading';
import Message from '../components/message';

export default function VotoForm() {
    const [loading, setLoading] = useState({ showLoading: false});
    const [message, setMessage] = useState({ type: "", message: "" });

    const [cpf, setCpf] = useState("");

    const params = useParams();

    const saveVoto = async (votoSelected: boolean) => {
        if (cpf) {
            const request = { "cpf": cpf, pautaId: Number(params.id), voto: votoSelected };

            setLoading({ showLoading: true });
            await api.post('/v1/voto/save', request)
                .then((res) => {
                    const msg = { type: "success", message: res.data.message };
                    setMessage(msg);
                    setCpf("");
                    setLoading({ showLoading: false });
                })
                .catch(err => {
                    const msg = { type: "danger", message: err.response ? JSON.stringify(err.response.data) : err.message };
                    setMessage(msg);
                    setLoading({ showLoading: false });
                });
        } else {
            const msg = { type: "warning", message: "Informe um CPF" };
            setMessage(msg);
        }
    }

    const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;

        const cpf = event.target.value;

        if ((cpf === "" || re.test(cpf)) && cpf.length <= 11) {
            setCpf(event.target.value);
        }
    };

    return (
        <>
            <Loading loading={loading} />
            <Message message={message} />

            <Container>
                <Row className="justify-content-center mt-3">
                    <Col sm={2}>
                        Voto Pauta: {params.pauta}
                    </Col>
                </Row>

                <Form>
                    <Row className="justify-content-center mt-3">
                        <Col sm={2}>
                            <FloatingLabel label="CPF">
                                <Form.Control id="cpf"
                                    type="text"
                                    value={cpf}
                                    onChange={handleCPFChange}
                                    maxLength={11}>
                                </Form.Control>
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-3">
                        <Col xs="auto">
                            <Button
                                variant="success"
                                onClick={() => saveVoto(true)}>
                                Sim
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="danger"
                                onClick={() => saveVoto(false)}>
                                Não
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )
}