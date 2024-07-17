import { emptySplitApi as api } from './emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<UploadFileApiResponse, UploadFileApiArg>({
      query: (queryArg) => ({ url: `/api/files/upload`, method: 'POST', body: queryArg.fileUpload })
    }),
    getFile: build.query<GetFileApiResponse, GetFileApiArg>({
      query: (queryArg) => ({ url: `/api/files/download/${queryArg.fileId}` })
    }),
    getScans: build.query<GetScansApiResponse, GetScansApiArg>({
      query: (queryArg) => ({
        url: `/api/scans`,
        params: { page: queryArg.page, size: queryArg.size }
      })
    }),
    createScan: build.mutation<CreateScanApiResponse, CreateScanApiArg>({
      query: (queryArg) => ({ url: `/api/scans`, method: 'POST', body: queryArg.scan })
    }),
    getScan: build.query<GetScanApiResponse, GetScanApiArg>({
      query: (queryArg) => ({ url: `/api/scans/${queryArg.scanId}` })
    }),
    updateScan: build.mutation<UpdateScanApiResponse, UpdateScanApiArg>({
      query: (queryArg) => ({
        url: `/api/scans/${queryArg.scanId}`,
        method: 'PUT',
        body: queryArg.scan
      })
    }),
    deleteScan: build.mutation<DeleteScanApiResponse, DeleteScanApiArg>({
      query: (queryArg) => ({ url: `/api/scans/${queryArg.scanId}`, method: 'DELETE' })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as LynxScannerAppApi }
export type UploadFileApiResponse = /** status 200 OK */ FileUploadResponse
export type UploadFileApiArg = {
  fileUpload: FileUpload
}
export type GetFileApiResponse = unknown
export type GetFileApiArg = {
  /** File ID */
  fileId: string
}
export type GetScansApiResponse = /** status 200 OK */ Scan[]
export type GetScansApiArg = {
  /** Page number */
  page?: number
  /** Size of page */
  size?: number
}
export type CreateScanApiResponse = /** status 200 OK */ Scan
export type CreateScanApiArg = {
  scan: Scan
}
export type GetScanApiResponse = /** status 200 OK */ Scan
export type GetScanApiArg = {
  /** Scan ID */
  scanId: string
}
export type UpdateScanApiResponse = /** status 200 OK */ Scan
export type UpdateScanApiArg = {
  /** Scan ID */
  scanId: string
  scan: Scan
}
export type DeleteScanApiResponse = unknown
export type DeleteScanApiArg = {
  /** Scan ID */
  scanId: string
}
export type FileUploadResponse = {
  file_id?: string
}
export type FileUpload = {
  file?: Blob
}
export type Scan = {
  id?: string
  created_at?: string
  updated_at?: string
  meta_data?: {
    [key: string]: string
  }
  title?: string
}
export const {
  useUploadFileMutation,
  useGetFileQuery,
  useGetScansQuery,
  useCreateScanMutation,
  useGetScanQuery,
  useUpdateScanMutation,
  useDeleteScanMutation
} = injectedRtkApi
