type RootStackParamList = {
  Home: undefined;
  Detail: { id: number; title: string; start: number }; // trong trường hợp để trống cũng được viết thêm |underfine
  About: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
