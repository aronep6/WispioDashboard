import { type RefObject } from "react";
import { type MediaPlayerElement } from "vidstack";
import { type RealtimeOutput } from "../../app_common/Service/Application/EditorService/interfaces";

export type EditorPlayerRefType = RefObject<MediaPlayerElement | undefined>

export interface EditingOutput {
    index: number,
    output: RealtimeOutput,
}