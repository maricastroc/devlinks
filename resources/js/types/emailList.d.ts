import { SubscriberProps } from "./subscriber";

export interface EmailListProps {
  user_id: number,
  id: number,
  title: string,
  subscribers: SubscriberProps[]
}