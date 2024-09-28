import React from "react";
import { SvgXml } from "react-native-svg";
import svgData from "./SvgStorage";

export default function SvgComponent({ svgKey,fill,width,height }) {
    const svgMarkup = svgData[svgKey];

    return <SvgXml xml={svgMarkup} width={width} height={height} fill={fill} />;
}
