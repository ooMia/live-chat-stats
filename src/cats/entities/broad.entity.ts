export interface BroadResponse {
  total_cnt: string;
  cnt: number;
  broad: Broad[];
  time: number;
  is_wp: [];
}

export interface Broad {
  broad_no: string;
  parent_broad_no: string;
  user_id: string;
  user_nick: string;
  broad_title: string;
  broad_thumb: string;
  broad_start: string;
  broad_grade: string;
  broad_bps: string;
  broad_resolution: string;
  visit_broad_type: string;
  broad_type: string;
  station_name: string;
  broad_memo: string;
  current_view_cnt: string;
  m_current_view_cnt: string;
  allowed_view_cnt: string;
  is_password: string;
  rank: string;
  broad_cate_no: string;
  total_view_cnt: string;
  pc_view_cnt: string;
  mobile_view_cnt: string;
  is_drops: number;
  auto_hashtags: string[];
  category_tags: string[];
  category_name: string;
  hash_tags: string[];
}
