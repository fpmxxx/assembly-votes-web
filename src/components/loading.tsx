import { Col, Row } from "react-bootstrap";

type Props = {
    loading: { showLoading: boolean }
}
export default function Loading({ loading }: Props) {

    return (
        <div style={{ display: loading.showLoading ? 'block' : 'none' }} >
            <Row style={{ position: 'fixed', width: '100%', height: '100%', display: 'flex', alignItems: 'center', background: '#cccccc', top: 0, opacity: 0.5, zIndex: 9999 }}>
                <Col className="d-flex flex-column min-vh-100 justify-content-center align-items-center" style={{ display: 'flex', margin: 0 }}>
                    Aguarde...
                </Col>
            </Row>
        </div>
    )
}