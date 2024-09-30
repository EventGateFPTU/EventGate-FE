/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/create-event': RouteRecordInfo<'/create-event', '/create-event', Record<never, never>, Record<never, never>>,
    '/events/[id]/': RouteRecordInfo<'/events/[id]/', '/events/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/events/[id]/buy-ticket/[ticketId]': RouteRecordInfo<'/events/[id]/buy-ticket/[ticketId]', '/events/:id/buy-ticket/:ticketId', { id: ParamValue<true>, ticketId: ParamValue<true> }, { id: ParamValue<false>, ticketId: ParamValue<false> }>,
    '/events/search': RouteRecordInfo<'/events/search', '/events/search', Record<never, never>, Record<never, never>>,
    '/my-tickets': RouteRecordInfo<'/my-tickets', '/my-tickets', Record<never, never>, Record<never, never>>,
    '/organizer/': RouteRecordInfo<'/organizer/', '/organizer', Record<never, never>, Record<never, never>>,
    '/organizer/create-event/[id]': RouteRecordInfo<'/organizer/create-event/[id]', '/organizer/create-event/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/organizer/events/[id]': RouteRecordInfo<'/organizer/events/[id]', '/organizer/events/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/show/[id]/checkin': RouteRecordInfo<'/show/[id]/checkin', '/show/:id/checkin', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/staff/': RouteRecordInfo<'/staff/', '/staff', Record<never, never>, Record<never, never>>,
    '/staff/events/[id]': RouteRecordInfo<'/staff/events/[id]', '/staff/events/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/teamMembers': RouteRecordInfo<'/teamMembers', '/teamMembers', Record<never, never>, Record<never, never>>,
  }
}
