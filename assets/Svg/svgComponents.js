import React from "react";
import { SvgXml } from "react-native-svg";
import svgData from "./SvgStorage";

export default function SvgComponent({ svgKey }) {
    const svgMarkup = svgData[svgKey];

    return <SvgXml xml={svgMarkup} width="301px" />;
}
