import { Figure } from "./Figure"
import Code from "./Code"
import Table from "./Table"

const serializers = {
  types: {
    mainImage: Figure,
    code: Code,
    table: Table,
  },
}

export default serializers
