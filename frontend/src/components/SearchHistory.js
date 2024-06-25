import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const SearchHistory = (props) => {
    const { history } = props

    return (
        <Row className="mt-5">
            <Col>
                <h2>Today Search History</h2>
                <div className="d-flex align-items-center weather-history-container flex-wrap">
                    {history && history.length > 0 &&
                        history.map((item, index) => {
                            return (
                                <div className="weather-item" key={index}>
                                    <p className="fw-bold weather-item__name">{item?.location?.name} ({item?.location?.localtime})</p>
                                    <div className="d-flex align-items-center mb-2">
                                        <img
                                            src={item?.current?.condition?.icon}
                                            alt=""
                                            width={50}
                                            height={50}
                                        />
                                        <span style={{ fontSize: 14 }}>{item?.current?.condition?.text}</span>
                                    </div>
                                    <p>Temp: {item?.current?.temp_c}&deg;C</p>
                                    <p>Wind: {item?.current?.wind_mph} mph</p>
                                    <p>Humidity: {item?.current?.humidity}%</p>
                                </div>
                            )
                        })
                    }
                </div>
            </Col>
        </Row>
    )
}

export default SearchHistory