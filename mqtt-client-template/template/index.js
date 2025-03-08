//1
import { File } from '@asyncapi/generator-react-sdk'
//2
export default function ({ asyncapi }) {
//3
  return <File name="client.java">{asyncapi.info().title()}</File>
}