import sanity_client from '@sanity/client'

export const client = sanity_client({
    projectId: 'nt4m3rch',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'sk0nQcgLH5dtwrgwkZHIjOtTEOLQMSIdfuiEQMmt52iFPUPeTp8r96PkDEWVvNN93RBBAYgFHxzW8vwziNVQejT02hX4Hr4UlFrS6PIQOu9iGTyuWgBLVkSS9budFZ6tBELGvQ37FiUnRffnInE7nS0wNF1aM2ZV5pwAfoUPGRuLWW6UvwBO',
    useCdn: false,
})