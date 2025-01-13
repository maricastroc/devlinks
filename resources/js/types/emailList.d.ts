import { SubscriberProps } from "./subscriber";

export type EmailListProps = {
  user_id: number,
  id: number,
  title: string,
  subscribers: SubscriberProps[]
}