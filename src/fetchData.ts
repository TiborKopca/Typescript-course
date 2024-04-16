//AXIOS - HTTP REQUESTS---------------------------------------------------------//
//data is located in the data property of the object
// let someUrl = 'https://volando.art'
// const { data } = axios.get(someUrl);

// axios.get<{ name: string }[]>(someUrl);

// export class Axios {
//   get<T = any, R = AxiosResponse<T>, D = any>(
//     url: string,
//     config?: AxiosRequestConfig<D>
//   ): Promise<R>;
// }

// export interface AxiosResponse<T = any, D = any> {
//   data: T;
//   status: number;
//   statusText: string;
//   headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
//   config: InternalAxiosRequestConfig<D>;
//   request?: any;
// }

//FETCH DATA---------------------------------------------------------//
const url = "https://www.course-api.com/react-tours-project";

async function fetchData(url: string) {
  try {
    const response = await fetch(url);

    // Check if the request was successful, 404 errors for example, or custom error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); //HTTP error! status: 404
    }

    const data = await response.json(); //array object
    return data;
  } catch (error) {
    //Typescript doesnt treat 404 errors as errors, only network errors
    const errMsg =
      error instanceof Error ? error.message : "there was an error...";
    console.error(errMsg);
    // throw error;
    return [];
  }
}

const tours = await fetchData(url);
tours.map((tour: any) => {
  console.log("Tour name:", tour.name); //fetches every Tour name : --> Best of Paris in 7 Days Tour, etc
});

//FETCH DATA THE CORRECT WAY---------------------------------------------------------//
// return empty array
// throw error in catch block
// we are not setting state values in this function
const url2 = "https://www.course-api.com/react-tours-project";

// Define a type for the data you're fetching.
type Tour = {
  id: string;
  name: string;
  info: string;
  image: string;
  price: string;
  // Add more fields as necessary. but when we add some inexistent properties, typescript cant know what they would be before the runtime
};

//Promise == generic
async function fetchData2(url: string): Promise<Tour[]> {
  try {
    const response = await fetch(url);

    // Check if the request was successful.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Tour[] = await response.json();
    console.log(data); //every object from JSON in array
    return data;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "there was an error...";
    console.error(errMsg);

    // throw error;
    return [];
  }
}

const tours2 = await fetchData2(url2);
tours2.map((tours2) => {
  console.log(tours2.name); //Best of Paris in 7 Days Tour, etc
  console.log(tours2.info); //Description data.. etc
});

//ZOD Library-runtime checks---------------------------------------------------------//
import { z } from "zod";
const url3 = "https://www.course-api.com/react-tours-project";

//ZOD methods
const tourSchema = z.object({
  id: z.string(), //if its a string or not
  name: z.string(),
  info: z.string(),
  image: z.string(),
  price: z.string(),
  somethign: z.string(),
});

// extract the inferred type
type Tour3 = z.infer<typeof tourSchema>;

async function fetchData3(url: string): Promise<Tour3[]> {
  try {
    const response = await fetch(url);

    // Check if the request was successful.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //runtime checks
    const rawData: Tour[] = await response.json();
    const result = tourSchema.array().safeParse(rawData);
    console.log(result) //{success: false}

    //check for arror in result data
    if (!result.success) {
      throw new Error(`Invalid data: ${result.error}`);
    }
    return result.data;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "there was an error...";
    console.log(errMsg);

    // throw error;
    return [];
  }
}

const tours3 = await fetchData3(url3);
tours3.map((tour3) => {
  console.log(tour3.name);
});

//TS DECLARATION FILES---------------------------------------------------------//
