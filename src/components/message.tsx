import { useEffect, useState } from "react";

import { Alert, Col, Row, Toast } from "react-bootstrap";

type Props = {
    message: { type: string, message: string };
}
export default function Message({ message }: Props) {

    const [showMessage, setShowMessage] = useState(true);
    const toggleShowMessage = () => setShowMessage(!showMessage);

    useEffect(() => {
        if (message && message.message) {
            setShowMessage(true);
        } else {
            setShowMessage(false);
            return;
        }

        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 3000);

        return () => clearTimeout(timer);

    }, [message]);

    if (!showMessage) {
        return null;
    }

    return (
        <Row style={{ position: 'fixed', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <Col className="d-flex flex-column min-vh-100 justify-content-center align-items-center" style={{ display: 'flex', margin: 0 }}>
                <Toast show={showMessage} onClose={toggleShowMessage}>
                    <Toast.Header>
                        <strong className="me-auto">Mensagem</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <Alert variant={message.type}>
                            {message.message}
                        </Alert>
                    </Toast.Body>
                </Toast>
            </Col>
        </Row>
    )

}
