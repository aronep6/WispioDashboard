export interface RealtimeOutput {
    from: number;
    to: number;
    output: string;
}
export default interface RealtimeOutputResponseDTO {
    records: RealtimeOutput[];
}

export interface EditingOutput {
    index: number,
    output: RealtimeOutput,
}