import { create } from 'zustand';
import {
  ProductData,
  totalPages,
  deviceHistory,
  relalationalUserData,
  UserData,
  alertHistory,
} from '@/app/lib/definitions';
import { getCurrentFormattedDate } from './functions';

// Dashboard
interface UserTypeState {
  isAdmin: boolean;
  setIsAdmin: (x: boolean) => void;
}

export const useUserTypeStore = create<UserTypeState>((set) => ({
  isAdmin: false,
  setIsAdmin: (input) => set((state) => ({ isAdmin: input })),
}));

// Resident
interface productsDataArrayState {
  productsData: ProductData[];
  setProductsData: (x: ProductData[]) => void;
}

export const useProductsDataArrayStore = create<productsDataArrayState>((set) => ({
  productsData: [],
  setProductsData: (x: ProductData[]) => set((state) => ({ productsData: x })),
}));

// Admin


// Sensors Page

// interface deviceDataArrayState {
//   deviceData: DeviceData[];
//   setDeviceData: (x: DeviceData[]) => void;
// }

// export const useDeviceDataArrayStore = create<deviceDataArrayState>((set) => ({
//   deviceData: [],
//   setDeviceData: (x: DeviceData[]) => set((state) => ({ deviceData: x })),
// }));

interface DisplayState {
  list: boolean;
  toggleList: () => void;
}

export const useDisplayStore = create<DisplayState>((set) => ({
  list: false,
  toggleList: () => set((state) => ({ list: !state.list })),
}));

interface SortState {
  sortBy: String;
  asc: boolean;
  currSorted: String;
  sortByName: () => void;
  sortByID: () => void;
  sortByStatus: () => void;
  sortByLocation: () => void;
  sortByTemp: () => void;
  sortByHum: () => void;
  sortByRecent: () => void;
  toggleOrder: () => void;
  setDefaultSort: () => void;
  setAsc: () => void;
  setCurrSorted: (currSorted: String) => void;
}

export const useSortByStore = create<SortState>((set) => ({
  sortBy: 'sensor_name',
  asc: true,
  currSorted: 'Sensor Name',
  sortByName: () => set(() => ({ sortBy: 'sensor_name' })),
  sortByID: () => set(() => ({ sortBy: 'sensor_id' })),
  sortByStatus: () => set(() => ({ sortBy: 'sensor_status' })),
  sortByLocation: () => set(() => ({ sortBy: 'sensor_location' })),
  sortByTemp: () => set(() => ({ sortBy: 'curr_temp' })),
  sortByHum: () => set(() => ({ sortBy: 'curr_humidity' })),
  sortByRecent: () => set(() => ({ sortBy: 'updatedAt' })),
  toggleOrder: () => set((state) => ({ asc: !state.asc })),
  setDefaultSort: () => () => ({ asc: true, sortBy: 'sensor_name' }),
  setAsc: () => {
    () => ({ asc: true });
  },
  setCurrSorted: (x: String) => set(() => ({ currSorted: x })),
}));

interface FilterState {
  filterOverThreshold: boolean;
  filterUnderThreshold: boolean;
  filterOnline: boolean;
  filterOffline: boolean;
  filterUnconfig: boolean;
  filterMySensors: boolean;
  setFilterOverThreshold: () => void;
  setFilterUnderThreshold: () => void;
  setFilterOnline: () => void;
  setFilterOffline: () => void;
  setFilterUnconfig: () => void;
  setFilterMySensors: () => void;
  clearFilters: () => void;
}

export const useFilterStateStore = create<FilterState>((set) => ({
  filterOverThreshold: false,
  filterUnderThreshold: false,
  filterOnline: false,
  filterOffline: false,
  filterUnconfig: false,
  filterMySensors: false,
  setFilterOverThreshold: () =>
    set((state) => ({ filterOverThreshold: !state.filterOverThreshold })),
  setFilterUnderThreshold: () =>
    set((state) => ({ filterUnderThreshold: !state.filterUnderThreshold })),
  setFilterOnline: () =>
    set((state) => ({ filterOnline: !state.filterOnline })),
  setFilterOffline: () =>
    set((state) => ({ filterOffline: !state.filterOffline })),
  setFilterUnconfig: () =>
    set((state) => ({ filterUnconfig: !state.filterUnconfig })),
  setFilterMySensors: () =>
    set((state) => ({ filterMySensors: !state.filterMySensors })),
  clearFilters: () =>
    set(() => ({
      filterOverThreshold: false,
      filterUnderThreshold: false,
      filterOnline: false,
      filterOffline: false,
      filterUnconfig: false,
      filterMySensors: false,
    })),
}));

// interface mySensorsState {
//   mySensors: DeviceData[];
//   setMySensors: (x: DeviceData[]) => void;
// }

// export const useMySensorsState = create<mySensorsState>((set) => ({
//   mySensors: [],
//   setMySensors: (x: DeviceData[]) => set((state) => ({ mySensors: x })),
// }));

// Pagination

interface PageNumberState {
  firstVisiblePage: number;
  pageNumber: number;
  setFirstVisiblePage: (firstVisiblePage: number) => void;
  setPageNumber: (update: (prevPageNumber: number) => number) => void;
}

export const usePageNumberStore = create<PageNumberState>((set) => ({
  firstVisiblePage: 1,
  pageNumber: 1,
  setFirstVisiblePage: (x: number) => set((state) => ({ firstVisiblePage: x })),
  setPageNumber: (update) =>
    set((state) => ({
      pageNumber:
        typeof update === 'function' ? update(state.pageNumber) : update,
    })),
}));

interface LastPageState {
  lastPage: totalPages;
  setLastPage: (lastPage: totalPages) => void;
}

export const useLastPageStore = create<LastPageState>((set) => ({
  lastPage: { pageCount: 0 },
  setLastPage: (lastPage: totalPages) => set((state) => ({ lastPage })),
}));

// Sensor Details Page

// interface deviceDataState {
//   deviceData: DeviceData;
//   setDeviceData: (x: DeviceData) => void;
// }

// export const useDeviceDataStore = create<deviceDataState>((set) => ({
//   deviceData: {
//     sensor_id: 'Loading...',
//     sensor_name: 'Loading...',
//     location: 'Loading...',
//     threshold_temp: 0,
//     last_alerted_temp: 0,
//     last_seen: 'Loading...',
//     alerts_enabled: true,
//     curr_temp: 0,
//     curr_humidity: 0,
//     createdAt: 'Loading...',
//     updatedAt: 'Loading...',
//     publishedAt: 'Loading...',
//     users: {
//       data: [],
//     },
//   },
//   setDeviceData: (x: DeviceData) => set((state) => ({ deviceData: x })),
// }));

interface SensorHistState {
  sensorHist: deviceHistory[];
  setSensorHist: (sensorHist: deviceHistory[]) => void;
}

export const useSensorHistStore = create<SensorHistState>((set) => ({
  sensorHist: [],
  setSensorHist: (x: deviceHistory[]) => set((state) => ({ sensorHist: x })),
}));

interface alertHistArrayState {
  alertHistory: alertHistory[];
  setAlertHistory: (x: alertHistory[]) => void;
  noAlerts: boolean;
  setNoAlerts: (x: boolean) => void;
}

export const useAlertHistArrayStore = create<alertHistArrayState>((set) => ({
  alertHistory: [],
  setAlertHistory: (x: alertHistory[]) => set((state) => ({ alertHistory: x })),
  noAlerts: false,
  setNoAlerts: (x: boolean) => set((state) => ({ noAlerts: x })),
}));

interface dateRangeState {
  dateRange: [any, any];
  setDateRange: (x: [Date | null, Date | null]) => void;
}

export const useDateRangeStore = create<dateRangeState>((set) => ({
  dateRange: [getCurrentFormattedDate(), getCurrentFormattedDate()],
  setDateRange: (x: [any, any]) => set((state) => ({ dateRange: x })),
}));

interface daysBetweenState {
  daysBetween: number;
  setDaysBetween: (x: number) => void;
}

export const useDaysBetweenStore = create<daysBetweenState>((set) => ({
  daysBetween: 1,
  setDaysBetween: (x: number) => set((state) => ({ daysBetween: x })),
}));

interface printRangeState {
  printRange: [any, any];
  setPrintRange: (x: [Date | null, Date | null]) => void;
}

export const usePrintRangeStore = create<printRangeState>((set) => ({
  printRange: [getCurrentFormattedDate(), getCurrentFormattedDate()],
  setPrintRange: (x: [any, any]) => set((state) => ({ printRange: x })),
}));

// Utilities

interface SearchState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const useSearchStateStore = create<SearchState>((set) => ({
  searchTerm: '',
  setSearchTerm: (x: string) => set((state) => ({ searchTerm: x })),
}));

interface RefreshState {
  refreshState: boolean;
  setRefresh: () => void;
}

export const useRefreshStore = create<RefreshState>((set) => ({
  refreshState: true,
  setRefresh: () => set((state) => ({ refreshState: !state.refreshState })),
}));

interface isEmptyState {
  isEmpty: boolean;
  setIsEmpty: () => void;
}

export const useIsEmptyStore = create<isEmptyState>((set) => ({
  isEmpty: false,
  setIsEmpty: () => set((state) => ({ isEmpty: !state.isEmpty })),
}));

interface popupState {
  showChngPwd: boolean;
  toggleChngPwd: () => void;
  showUsers: boolean;
  toggleShowUsers: () => void;
  showBuyProduct: boolean;
  selectedProductID: number;
  toggleBuyProduct: () => void;
  setSelectedProduct: (x: number) => void;
  showSelectUsers: boolean;
  toggleSelectUsers: () => void;
}

export const usePopupStore = create<popupState>((set) => ({
  showChngPwd: false,
  toggleChngPwd: () => set((state) => ({ showChngPwd: !state.showChngPwd })),
  showUsers: false,
  toggleShowUsers: () => set((state) => ({ showUsers: !state.showUsers })),
  showBuyProduct: false,
  selectedProductID: 0,
  toggleBuyProduct: () =>
    set((state) => ({ showBuyProduct: !state.showBuyProduct })),
  setSelectedProduct: (x: number) =>
    set((state) => ({ selectedProductID: x })),
  showSelectUsers: false,
  toggleSelectUsers: () =>
    set((state) => ({ showSelectUsers: !state.showSelectUsers })),
}));

// Profile Page

interface UserState {
  userData: {
    id: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    alert_template: string;
    phone_number: string;
  };
  setUserData: (user: UserData) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userData: {
    id: 'Loading...',
    username: 'Loading...',
    email: 'Loading...',
    provider: 'Loading...',
    confirmed: false,
    blocked: false,
    createdAt: 'Loading...',
    updatedAt: 'Loading...',
    alert_template: 'Loading...',
    phone_number: 'Loading...',
  },
  setUserData: (user) =>
    set((state) => ({
      userData: { ...state.userData, ...user },
    })),
}));

interface changePwdState {
  oldPwd: string;
  newPwd: string;
  matchPwd: string;
  PwdIsValid: boolean; // entered password meets requirements
  PwdIsMatch: boolean; // new passwords match
  setOldPwd: (x: string) => void;
  setNewPwd: (x: string) => void;
  setMatchPwd: (s: string) => void;
  setPwdIsValid: (x: boolean) => void;
  setPwdIsMatch: () => void;
  clearChngPwd: () => void;
}

export const useChangePwdStore = create<changePwdState>((set) => ({
  oldPwd: '',
  newPwd: '',
  matchPwd: '',
  PwdIsValid: false,
  PwdIsMatch: false,
  setOldPwd: (x: string) => set((state) => ({ oldPwd: x })),
  setNewPwd: (x: string) => set((state) => ({ newPwd: x })),
  setMatchPwd: (x: string) => set((state) => ({ matchPwd: x })),
  setPwdIsValid: (x: boolean) => set((state) => ({ PwdIsValid: x })), // character check is done inside form
  setPwdIsMatch: () =>
    set((state) => ({ PwdIsMatch: state.newPwd == state.matchPwd })),
  clearChngPwd: () =>
    set(() => ({
      oldPwd: '',
      newPwd: '',
      matchPwd: '',
    })),
}));

// Users Page

interface userArrayState {
  userArray: relalationalUserData[];
  setUserArray: (userArray: relalationalUserData[]) => void;
}

export const useUserArrayStore = create<userArrayState>((set) => ({
  userArray: [],
  setUserArray: (data) =>
    set((state) => ({
      userArray: data,
    })),
}));
