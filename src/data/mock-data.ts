import type {
  TeamMember,
  Contact,
  Invoice,
  Transaction,
  BarDataItem,
  LineDataItem,
  PieDataItem,
  GeographyDataItem,
} from "@/types";

export const mockDataTeam: TeamMember[] = [
  { id: 1, name: "Jon Snow", email: "jonsnow@gmail.com", age: 35, phone: "(665)121-5454", access: "admin" },
  { id: 2, name: "Cersei Lannister", email: "cerseilannister@gmail.com", age: 42, phone: "(421)314-2288", access: "manager" },
  { id: 3, name: "Jaime Lannister", email: "jaimelannister@gmail.com", age: 45, phone: "(422)982-6739", access: "user" },
  { id: 4, name: "Anya Stark", email: "anyastark@gmail.com", age: 16, phone: "(921)425-6742", access: "admin" },
  { id: 5, name: "Daenerys Targaryen", email: "daenerystargaryen@gmail.com", age: 31, phone: "(421)445-1189", access: "user" },
  { id: 6, name: "Ever Melisandre", email: "evermelisandre@gmail.com", age: 150, phone: "(232)545-6483", access: "manager" },
  { id: 7, name: "Ferrara Franco", email: "ferrarafranco@gmail.com", age: 44, phone: "(543)451-4312", access: "user" },
  { id: 8, name: "Rossini Frances", email: "rossinifrances@gmail.com", age: 36, phone: "(442)572-6543", access: "user" },
  { id: 9, name: "Harvey Roxie", email: "harveyroxie@gmail.com", age: 65, phone: "(442)572-6543", access: "admin" },
  { id: 10, name: "Tobi Andrew", email: "tobiandrew@gmail.com", age: 40, phone: "(443)572-6543", access: "user" },
  { id: 11, name: "Doja Cat", email: "dojacat@gmail.com", age: 28, phone: "(111)222-3333", access: "user" },
  { id: 12, name: "Naruto Uzumaki", email: "narutouzumaki@gmail.com", age: 17, phone: "(333)444-5555", access: "user" },
  { id: 13, name: "Sasuke Uchiha", email: "sasukeuchiha@gmail.com", age: 17, phone: "(333)444-6666", access: "user" },
  { id: 14, name: "Sakura Haruno", email: "sakuraharuno@gmail.com", age: 17, phone: "(333)444-7777", access: "user" },
];

export const mockDataContacts: Contact[] = [
  { id: 1, registrarId: 1001, name: "Jon Snow", age: 35, phone: "(665)121-5454", email: "jonsnow@gmail.com", address: "123 Castle St, Winterfell", city: "Winterfell", zipCode: "10001" },
  { id: 2, registrarId: 1002, name: "Cersei Lannister", age: 42, phone: "(421)314-2288", email: "cersei@gmail.com", address: "456 Crown St, Kings Landing", city: "Kings Landing", zipCode: "10002" },
  { id: 3, registrarId: 1003, name: "Jaime Lannister", age: 45, phone: "(422)982-6739", email: "jaime@gmail.com", address: "789 Sword Ave, Casterly Rock", city: "Casterly Rock", zipCode: "10003" },
  { id: 4, registrarId: 1004, name: "Anya Stark", age: 16, phone: "(921)425-6742", email: "anya@gmail.com", address: "321 Needle Ln, Winterfell", city: "Winterfell", zipCode: "10004" },
  { id: 5, registrarId: 1005, name: "Daenerys Targaryen", age: 31, phone: "(421)445-1189", email: "dany@gmail.com", address: "1 Dragon St, Dragonstone", city: "Dragonstone", zipCode: "10005" },
  { id: 6, registrarId: 1006, name: "Tyrion Lannister", age: 40, phone: "(111)222-3333", email: "tyrion@gmail.com", address: "1 Clever St, Casterly Rock", city: "Casterly Rock", zipCode: "10006" },
  { id: 7, registrarId: 1007, name: "Sansa Stark", age: 20, phone: "(222)333-4444", email: "sansa@gmail.com", address: "1 Queen St, Winterfell", city: "Winterfell", zipCode: "10007" },
  { id: 8, registrarId: 1008, name: "Arya Stark", age: 16, phone: "(333)444-5555", email: "arya@gmail.com", address: "1 Faceless St, Braavos", city: "Braavos", zipCode: "10008" },
  { id: 9, registrarId: 1009, name: "Bran Stark", age: 18, phone: "(444)555-6666", email: "bran@gmail.com", address: "1 Three Eye St, Winterfell", city: "Winterfell", zipCode: "10009" },
  { id: 10, registrarId: 1010, name: "Theon Greyjoy", age: 28, phone: "(555)666-7777", email: "theon@gmail.com", address: "1 Salt St, Pyke", city: "Pyke", zipCode: "10010" },
  { id: 11, registrarId: 1011, name: "Davos Seaworth", age: 50, phone: "(666)777-8888", email: "davos@gmail.com", address: "1 Onion St, Flea Bottom", city: "Kings Landing", zipCode: "10011" },
  { id: 12, registrarId: 1012, name: "Samwell Tarly", age: 24, phone: "(777)888-9999", email: "sam@gmail.com", address: "1 Book St, Castle Black", city: "Castle Black", zipCode: "10012" },
  { id: 13, registrarId: 1013, name: "Brienne of Tarth", age: 32, phone: "(888)999-0000", email: "brienne@gmail.com", address: "1 Honor St, Tarth", city: "Tarth", zipCode: "10013" },
  { id: 14, registrarId: 1014, name: "Tormund Giantsbane", age: 45, phone: "(999)000-1111", email: "tormund@gmail.com", address: "1 Wildling St, Beyond Wall", city: "Beyond Wall", zipCode: "10014" },
  { id: 15, registrarId: 1015, name: "Varys", age: 55, phone: "(000)111-2222", email: "varys@gmail.com", address: "1 Spider St, Kings Landing", city: "Kings Landing", zipCode: "10015" },
  { id: 16, registrarId: 1016, name: "Petyr Baelish", age: 43, phone: "(111)222-3333", email: "littlefinger@gmail.com", address: "1 Chaos St, Kings Landing", city: "Kings Landing", zipCode: "10016" },
];

export const mockDataInvoices: Invoice[] = [
  { id: 1, name: "Jon Snow", phone: "(665)121-5454", email: "jonsnow@gmail.com", cost: 2135, date: "2021-09-01" },
  { id: 2, name: "Cersei Lannister", phone: "(421)314-2288", email: "cersei@gmail.com", cost: 1125, date: "2021-09-02" },
  { id: 3, name: "Jaime Lannister", phone: "(422)982-6739", email: "jaime@gmail.com", cost: 2135, date: "2021-09-03" },
  { id: 4, name: "Anya Stark", phone: "(921)425-6742", email: "anya@gmail.com", cost: 875, date: "2021-09-04" },
  { id: 5, name: "Daenerys Targaryen", phone: "(421)445-1189", email: "dany@gmail.com", cost: 3245, date: "2021-09-05" },
  { id: 6, name: "Tyrion Lannister", phone: "(111)222-3333", email: "tyrion@gmail.com", cost: 1135, date: "2021-09-06" },
  { id: 7, name: "Sansa Stark", phone: "(222)333-4444", email: "sansa@gmail.com", cost: 1245, date: "2021-09-07" },
  { id: 8, name: "Arya Stark", phone: "(333)444-5555", email: "arya@gmail.com", cost: 3245, date: "2021-09-08" },
  { id: 9, name: "Bran Stark", phone: "(444)555-6666", email: "bran@gmail.com", cost: 875, date: "2021-09-09" },
  { id: 10, name: "Theon Greyjoy", phone: "(555)666-7777", email: "theon@gmail.com", cost: 2135, date: "2021-09-10" },
  { id: 11, name: "Davos Seaworth", phone: "(666)777-8888", email: "davos@gmail.com", cost: 1125, date: "2021-09-11" },
  { id: 12, name: "Samwell Tarly", phone: "(777)888-9999", email: "sam@gmail.com", cost: 3245, date: "2021-09-12" },
  { id: 13, name: "Brienne of Tarth", phone: "(888)999-0000", email: "brienne@gmail.com", cost: 875, date: "2021-09-13" },
  { id: 14, name: "Tormund Giantsbane", phone: "(999)000-1111", email: "tormund@gmail.com", cost: 1135, date: "2021-09-14" },
  { id: 15, name: "Varys", phone: "(000)111-2222", email: "varys@gmail.com", cost: 2135, date: "2021-09-15" },
  { id: 16, name: "Petyr Baelish", phone: "(111)222-3333", email: "littlefinger@gmail.com", cost: 1125, date: "2021-09-16" },
];

export const mockTransactions: Transaction[] = [
  { txId: "001", user: "Jon Snow", cost: "21.24", date: "2021-09-01" },
  { txId: "002", user: "Cersei Lannister", cost: "11.55", date: "2021-09-02" },
  { txId: "003", user: "Jaime Lannister", cost: "12.67", date: "2021-09-03" },
  { txId: "004", user: "Anya Stark", cost: "34.12", date: "2021-09-04" },
  { txId: "005", user: "Daenerys Targaryen", cost: "11.22", date: "2021-09-05" },
  { txId: "006", user: "Tyrion Lannister", cost: "45.34", date: "2021-09-06" },
  { txId: "007", user: "Sansa Stark", cost: "12.55", date: "2021-09-07" },
  { txId: "008", user: "Arya Stark", cost: "23.44", date: "2021-09-08" },
  { txId: "009", user: "Bran Stark", cost: "12.67", date: "2021-09-09" },
  { txId: "010", user: "Theon Greyjoy", cost: "34.12", date: "2021-09-10" },
];

export const mockBarData: BarDataItem[] = [
  { country: "USA", "hot dog": 120, burger: 180, sandwich: 90, kebab: 70, fries: 140, donut: 110 },
  { country: "UK", "hot dog": 80, burger: 120, sandwich: 60, kebab: 50, fries: 90, donut: 70 },
  { country: "Canada", "hot dog": 90, burger: 140, sandwich: 70, kebab: 60, fries: 110, donut: 80 },
  { country: "Germany", "hot dog": 100, burger: 160, sandwich: 80, kebab: 120, fries: 130, donut: 90 },
  { country: "France", "hot dog": 70, burger: 100, sandwich: 50, kebab: 40, fries: 80, donut: 60 },
  { country: "Japan", "hot dog": 60, burger: 90, sandwich: 110, kebab: 80, fries: 70, donut: 100 },
  { country: "Brazil", "hot dog": 110, burger: 130, sandwich: 70, kebab: 90, fries: 100, donut: 80 },
  { country: "India", "hot dog": 50, burger: 70, sandwich: 80, kebab: 100, fries: 60, donut: 40 },
  { country: "Australia", "hot dog": 80, burger: 110, sandwich: 60, kebab: 70, fries: 90, donut: 70 },
  { country: "China", "hot dog": 130, burger: 170, sandwich: 90, kebab: 110, fries: 150, donut: 120 },
];

export const mockLineData: LineDataItem[] = [
  { name: "Jan", cost: 1200, profit: 800, loss: 200 },
  { name: "Feb", cost: 1800, profit: 1200, loss: 300 },
  { name: "Mar", cost: 1500, profit: 1000, loss: 250 },
  { name: "Apr", cost: 2200, profit: 1500, loss: 400 },
  { name: "May", cost: 1900, profit: 1300, loss: 350 },
  { name: "Jun", cost: 2500, profit: 1700, loss: 500 },
  { name: "Jul", cost: 2100, profit: 1400, loss: 420 },
  { name: "Aug", cost: 2800, profit: 1900, loss: 550 },
  { name: "Sep", cost: 2300, profit: 1600, loss: 450 },
  { name: "Oct", cost: 2600, profit: 1800, loss: 480 },
  { name: "Nov", cost: 2900, profit: 2000, loss: 580 },
  { name: "Dec", cost: 3200, profit: 2200, loss: 620 },
];

export const mockPieData: PieDataItem[] = [
  { id: "group-a", label: "Group A", value: 400 },
  { id: "group-b", label: "Group B", value: 300 },
  { id: "group-c", label: "Group C", value: 300 },
  { id: "group-d", label: "Group D", value: 200 },
  { id: "group-e", label: "Group E", value: 278 },
  { id: "group-f", label: "Group F", value: 189 },
];

export const mockGeographyData: GeographyDataItem[] = [
  { id: "USA", value: 954500, country: "United States" },
  { id: "GBR", value: 678000, country: "United Kingdom" },
  { id: "FRA", value: 543000, country: "France" },
  { id: "DEU", value: 432000, country: "Germany" },
  { id: "JPN", value: 387000, country: "Japan" },
  { id: "BRA", value: 356000, country: "Brazil" },
  { id: "IND", value: 321000, country: "India" },
  { id: "AUS", value: 289000, country: "Australia" },
  { id: "CAN", value: 267000, country: "Canada" },
  { id: "CHN", value: 890000, country: "China" },
  { id: "RUS", value: 423000, country: "Russia" },
  { id: "ZAF", value: 198000, country: "South Africa" },
];
