export interface RouteRecord {
  path: string; // 路由路径，用/开头
  public: boolean; // 是否需要登录，public=true表示不需要登录
}
