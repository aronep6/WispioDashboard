class CreateNewTaskTestFns {
    static isValidType(file: File, typesAllowed: string[]): boolean {
        console.log(file.type);
        if (!typesAllowed.includes(file.type)) return false;
        return true;
    }

    static isValidSize(file: File, maxSizeAllowed: number): boolean {
        console.log(file.size);
        if (file.size > maxSizeAllowed) return false;
        return true;
    }
}

export default CreateNewTaskTestFns;