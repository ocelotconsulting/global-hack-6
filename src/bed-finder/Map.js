import React from 'react'

const mapStyle = {
    margin: '14px 0px',
    width: '100%',
    height: 300,
    border: '1px solid black'
}

const center = {
    lat: 38.632351,
    lng: -90.228033
}

export default class Map extends React.Component {
    componentDidMount() {
        this.map = new google.maps.Map(this.refs.map, { center, zoom: 16 })
    }

    render() {
        console.log(this.props)
        return (
            <div ref="map" style={mapStyle}/>
        )
    }
}