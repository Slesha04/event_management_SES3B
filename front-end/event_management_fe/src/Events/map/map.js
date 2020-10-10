// https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs
//https://janosh.dev/blog/google-maps+react-hooks
import { useGoogleMaps } from "react-hook-google-maps";
import {  useState } from "react";


// real key// AI**_E

import React, { useEffect, useRef } from 'react'
export default function Map({ options, onMount, className, onMountProps }) {
  const ref = useRef()
  const [map, setMap] = useState()
  useEffect(() => {
    const onLoad = () => setMap(new window.google.maps.Map(ref.current, options))
    if (!window.google) {
      const script = document.createElement(`script`)
      script.src =
        `http://maps.google.com/maps/api/js`
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  }, [options])
  if (map && typeof onMount === `function`) onMount(map, onMountProps)
  return (
    <div
      style={{ height: `60vh`, margin: `1em 0`, borderRadius: `0.5em` }}
      {...{ ref, className }}
    />
  )
}
Map.defaultProps = {
  options: {
    center: { lat: 48, lng: 8 },
    zoom: 5,
  },
}
