import Vue from 'vue'

export interface LinMetaInfo {
    install(vue: typeof Vue): void
}