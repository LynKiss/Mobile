interface IProduct {
  id: number;
  name: string;
  category_id: number;
  price: number;
  stock: number;
  status_id: number;
  created_at: string;
  image_url: string;
  updated_at: string;
  description: string;
}

interface IEmployee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  created_at: string;
}

type RootStackParamList = {
  Home: undefined;
  Detail: { product: IProduct };
  Employee: undefined;
  About: undefined;
  Login: undefined;
  Register: undefined;
  HomeLayout: undefined;
  HomeNew: undefined;
  Cart: undefined;
  Checkout: undefined;
  HomeDrawer: undefined;
  CartDrawer: undefined;
};

export { RootStackParamList };

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
declare module "*.jpg";
