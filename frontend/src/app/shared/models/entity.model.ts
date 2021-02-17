export abstract class EntityModel<T> {
    abstract fromJSON(data?: any) : T;
    abstract toJSON(): Partial<T>;
}