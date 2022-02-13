import { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';

import api from '../utils/api';
import Message from '../components/message';

export default function PautaForm() {
    const [message, setMessage] = useState({ type: "", message: "" });

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nome = (event.target as any).nome.value;
        const minutosVotacao = (event.target as any).minutosVotacao.value;

        const request = { "nome": nome, "minutosVotacao": minutosVotacao}

        api.post('/v1/pauta/save', request)
            .then((res) => {
                const msg = { type: "success", message: res.status === 200 ? "Cadastrado com sucesso" : "" };
                setMessage(msg);
            })
            .catch(err => {
                console.log(err.response.data.message);

                let msg = { type: "danger", message: err.response.data.message };
                setMessage(msg);
            });
    }

    return (
        <>
            {message ? <Message message={message} /> : ""}

            <Container>
                <Form onSubmit={onSubmit}>
                    <Row className="justify-content-center mt-3">
                        <Col sm={7}>
                            <FloatingLabel label="Pauta">
                                <Form.Control id="nome"
                                    type="text"
                                    maxLength={50}>
                                </Form.Control>
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-3">
                        <Col sm={2}>
                            <FloatingLabel label="Duração em minutos">
                                <Form.Control id="minutosVotacao"
                                    type="text"
                                    onKeyDown={e => /[^0-9]/g.test(e.key) && e.preventDefault()}
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
