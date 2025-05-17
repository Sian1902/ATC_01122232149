export interface SignInResponse {
  token: string;
  user: User; // define User interface with needed properties
}
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    bookedEvents:number[]; 
    likedEvents: number[];
}
