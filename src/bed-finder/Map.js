import React from 'react'

const mapStyle = {
    margin: '14px 0px',
    width: '100%',
    height: 300,
    border: '1px solid black'
}

export default class Map extends React.Component {
    componentDidMount() {
        const center = {
            lat: this.props.shelterLocation.lat,
            lng: this.props.shelterLocation.long
        }
        this.map = new google.maps.Map(this.refs.map, {center, zoom: 16 })
        const marker = new google.maps.Marker({ position: center, map: this.map})
    }

    render() {
        console.log(this.props)
        return (
            <div ref="map" style={mapStyle}/>
        )
    }
}