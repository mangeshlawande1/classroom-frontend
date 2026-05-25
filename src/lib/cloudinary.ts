import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import {dpr, format, quality } from "@cloudinary/url-gen/actions/delivery";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { CLOUDINARY_CLOUD_NAME } from "@/constants";

const cld = new Cloudinary({
    cloud: {
        cloudName: CLOUDINARY_CLOUD_NAME,
    },
    url: {
        secure: true,
    },
});
export const bannerPhoto = (
    imageCldPubId: string,
    name: string
) => {

    const safeName = name
        .replace(/[^\w\s-]/g, "")
        .trim();

    return cld
        .image(imageCldPubId)
        .resize(
            fill())
        .delivery(format("auto"))
        .delivery(quality("auto"))
        .delivery(dpr("auto"))
        .overlay(
            source(
                text(
                    safeName,
                    new TextStyle("roboto", 100)
                        .fontWeight("bold")
                ).textColor("white")
            ).position(
                new Position()
                    .gravity(compass("south_west"))
                    .offsetX(0.2)
            )
        );
};