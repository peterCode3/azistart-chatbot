import { omit } from 'lodash'
import { ICommonObject, IDocument, INode, INodeData, INodeOutputsValue, INodeParams } from '../../../src/Interface'
import { TextSplitter } from 'langchain/text_splitter'
import { CSVLoader } from 'langchain/document_loaders/fs/csv'
import { getFileFromStorage, handleEscapeCharacters } from '../../../src'

class Csv_DocumentLoaders implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs: INodeParams[]
    outputs: INodeOutputsValue[]

    constructor() {
        this.label = 'Media'
        this.name = 'csvFile'
        this.version = 2.0
        this.type = 'Document'
        this.icon = 'csv.svg'
        this.category = 'Document Loaders'
        this.description = `Upload File (  )`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Upload Media File',
                name: 'csvFile',
                type: 'file',
                fileType: '.csv'
            },
            // {
            //     label: 'Text Splitter',
            //     name: 'textSplitter',
            //     type: 'TextSplitter',
            //     optional: true
            // },
            // {
            //     label: 'Single Column Extraction',
            //     name: 'columnName',
            //     type: 'string',
            //     description: 'Extracting a single column',
            //     placeholder: 'Enter column name',
            //     optional: true
            // },
            // {
            //     label: 'Additional Metadata',
            //     name: 'metadata',
            //     type: 'json',
            //     description: 'Additional metadata to be added to the extracted documents',
            //     optional: true,
            //     additionalParams: true
            // },
            // {
            //     label: 'Omit Metadata Keys',
            //     name: 'omitMetadataKeys',
            //     type: 'string',
            //     rows: 4,
            //     description:
            //         'Each document loader comes with a default set of metadata keys that are extracted from the document. You can use this field to omit some of the default metadata keys. The value should be a list of keys, seperated by comma. Use * to omit all metadata keys execept the ones you specify in the Additional Metadata field',
            //     placeholder: 'key1, key2, key3.nestedKey1',
            //     optional: true,
            //     additionalParams: true
            // }
        ]
        this.outputs = [
            {
                label: 'Document',
                name: 'document',
                description: 'Array of document objects containing metadata and pageContent',
                baseClasses: [...this.baseClasses, 'json']
            },
            {
                label: 'Text',
                name: 'text',
                description: 'Concatenated string from pageContent of documents',
                baseClasses: ['string', 'json']
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const textSplitter = nodeData.inputs?.textSplitter as TextSplitter
        const csvFileBase64 = nodeData.inputs?.csvFile as string
        const columnName = nodeData.inputs?.columnName as string
        const metadata = nodeData.inputs?.metadata
        const output = nodeData.outputs?.output as string
        const _omitMetadataKeys = nodeData.inputs?.omitMetadataKeys as string

        let omitMetadataKeys: string[] = []
        if (_omitMetadataKeys) {
            omitMetadataKeys = _omitMetadataKeys.split(',').map((key) => key.trim())
        }

        let docs: IDocument[] = []
        let files: string[] = []

        if (csvFileBase64.startsWith('FILE-STORAGE::')) {
            const fileName = csvFileBase64.replace('FILE-STORAGE::', '')
            if (fileName.startsWith('[') && fileName.endsWith(']')) {
                files = JSON.parse(fileName)
            } else {
                files = [fileName]
            }
            const chatflowid = options.chatflowid

            for (const file of files) {
                const fileData = await getFileFromStorage(file, chatflowid)
                const blob = new Blob([fileData])
                const loader = new CSVLoader(blob, columnName.trim().length === 0 ? undefined : columnName.trim())

                if (textSplitter) {
                    docs.push(...(await loader.loadAndSplit(textSplitter)))
                } else {
                    docs.push(...(await loader.load()))
                }
            }
        } else {
            if (csvFileBase64.startsWith('[') && csvFileBase64.endsWith(']')) {
                files = JSON.parse(csvFileBase64)
            } else {
                files = [csvFileBase64]
            }

            for (const file of files) {
                const splitDataURI = file.split(',')
                splitDataURI.pop()
                const bf = Buffer.from(splitDataURI.pop() || '', 'base64')
                const blob = new Blob([bf])
                const loader = new CSVLoader(blob, columnName.trim().length === 0 ? undefined : columnName.trim())

                if (textSplitter) {
                    docs.push(...(await loader.loadAndSplit(textSplitter)))
                } else {
                    docs.push(...(await loader.load()))
                }
            }
        }

        if (metadata) {
            const parsedMetadata = typeof metadata === 'object' ? metadata : JSON.parse(metadata)
            docs = docs.map((doc) => ({
                ...doc,
                metadata:
                    _omitMetadataKeys === '*'
                        ? {
                              ...parsedMetadata
                          }
                        : omit(
                              {
                                  ...doc.metadata,
                                  ...parsedMetadata
                              },
                              omitMetadataKeys
                          )
            }))
        } else {
            docs = docs.map((doc) => ({
                ...doc,
                metadata:
                    _omitMetadataKeys === '*'
                        ? {}
                        : omit(
                              {
                                  ...doc.metadata
                              },
                              omitMetadataKeys
                          )
            }))
        }

        if (output === 'document') {
            return docs
        } else {
            let finaltext = ''
            for (const doc of docs) {
                finaltext += `${doc.pageContent}\n`
            }
            return handleEscapeCharacters(finaltext, false)
        }
    }
}

module.exports = { nodeClass: Csv_DocumentLoaders }
