import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const SearchHistory = (props) => {
    const { history } = props

    return (
        <Row className="mt-5">
            <Col className="weaather-history">
                <h2>Today Search History</h2>
                <div className="weather-history-container">
                    {history && history.length > 0 &&
                        history.map((item, index) => {
                            return (
                                <div className="weather-item" key={index}>
                                    <span className="fw-bold weather-item__name">
                                        <p>{item?.location?.name}</p>
                                        <p>({item?.location?.localtime})</p>
                                    </span>
                                    <div className="weather-image-container">
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