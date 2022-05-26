import { VNode, CreateElement } from 'vue';

interface MessageOption {
  content: string
  type: 'info'| 'success'| 'error'| 'loading',
  key: string,
  duration: number
} 
type Message = ( option: MessageOption)=> void | {
  success(content: string, key: string, duration?: number): void;
  success(content: string, duration: number): void;
  info(content: string, key: string, duration?: number): void;
  info(content: string, duration: number): void;
  error(content: string, key: string, duration?: number): void;
  error(content: string, duration: number): void;
  loading(content: string, key: string, duration?: number): void;
  loading(content: string, duration: number): void;
}
declare module 'vue/types/vue' {
  interface Vue{
    $message: Message
  }
}