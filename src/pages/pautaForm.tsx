import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';

import api from '../utils/api';
import Loading from '../components/loading';
import Message from '../components/message';
import { Pauta } from '../types/pauta';

export default function PautaForm() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState({ showLoading: false});
    const [message, setMessage] = useState({ type: "", message: "" });
    const [nome, setNome] = useState("");
    const [minutosVotacao, setMinutosVotacao] = useState("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nome = (event.target as any).nome.value;
        const minutosVotacao = (event.target as any).minutosVotacao.value;

        const request = { "nome": nome, "minutosVotacao": minutosVotacao }

        setLoading({ showLoading: true });
        await api.post('/v1/pauta/save', request)
            .then((res) => {
                const msg = { type: "success", message: res.status === 200 ? "Cadastrado com sucesso" : "" };
                setMessage(msg);

                const data = res.data as Pauta;

                navigate(`/voto/form/${data.id}/${data.nome}`);
                setLoading({ showLoading: false });
            })
            .catch(err => {
                const msg = { type: "danger", message: err.response ? JSON.stringify(err.response.data) : err.message };
                setMessage(msg);
                setLoading({ showLoading: false });
            });
    }

    const handleChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re = /\S+/;
        if (event.target.value === "" || re.test(event.target.value)) {
            setNome(event.target.value);
        }
    }

    const handleChangeMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            setMinutosVotacao(event.target.value);
        }
    }

    return (
        <>
            <Loading loading={loading} />
            <Message message={message} />

            <Container>
                <Form onSubmit={onSubmit}>
                    <Row className="justify-content-center mt-3">
                        <Col sm={7}>
                            <FloatingLabel label="Pauta">
                                <Form.Control id="nome"
                                    value={nome}
                                    type="text"
                                    onChange={handleChangeNome}
                                    maxLength={50}>
                                </Form.Control>
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-3">
                        <Col sm={2}>
                            <FloatingLabel label="Duração em minutos">
                                <Form.Control id="minutosVotacao"
                                    value={minutosVotacao}
                                    type="text"
                                    onChange={handleChangeMinutes}
                                    maxLength={2}>
                                </Form.Control>
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-3">
                        <Col xs="auto">
                            <Button type="submit"
                                variant="primary">
                                Salvar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )
}
