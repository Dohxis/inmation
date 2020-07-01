import { IReadData } from "../interfaces/IReadData";
import { IReadHistoricalData } from "../interfaces/IReadHistoricalData";

export class APIService {
  constructor(protected _server: string, protected _token: string) {}

  private get<T>(method: string, data: { [key: string]: string }): Promise<T> {
    const queryParameters = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");

    return fetch(this._server + method + `?${queryParameters}`, {
      method: "GET",
      headers: new Headers({
        Authorization: this._token,
        "Content-Type": "application/json",
      }),
    }).then((response) => response.json());
  }

  public read(identifier: string): Promise<IReadData> {
    return this.get<IReadData>("/read", { identifier });
  }

  public readHistoricalData(
    identifier: string,
    startTime: string,
    endTime: string
  ): Promise<IReadHistoricalData> {
    return this.get<IReadHistoricalData>("/readhistoricaldata", {
      identifier,
      start_time: startTime,
      end_time: endTime,
    });
  }
}
