export interface NewEvent {
  title: string;
  description?: string;
  location?: string;
  date: Date; // ⚠️ Ici c’est un Date et non une string
}
