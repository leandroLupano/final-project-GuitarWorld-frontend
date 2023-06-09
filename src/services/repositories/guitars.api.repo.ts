import { GuitarServerResponse, GuitarStructure } from '../../models/guitar';

export interface GuitarsRepo<T> {
  read(token: string, pageChange: number, style: string): Promise<T>;
  readId(token: string, idGuitar: GuitarStructure['id']): Promise<T>;
  create(token: string, infoGuitar: Partial<GuitarStructure>): Promise<T>;
  update(
    token: string,
    idGuitar: GuitarStructure['id'],
    infoGuitar: Partial<GuitarStructure>
  ): Promise<T>;
  delete(token: string, idGuitar: GuitarStructure['id']): Promise<void>;
}

export class GuitarsApiRepo implements GuitarsRepo<GuitarServerResponse> {
  url: string;

  constructor() {
    this.url =
      'https://leandro-lupano-final-project-back-202301.onrender.com/guitars';
  }

  async read(
    token: string,
    pageLoad: number,
    styleLoad: string
  ): Promise<GuitarServerResponse> {
    const pageString = pageLoad.toString();

    const url =
      this.url + '/products?style=' + styleLoad + '&page=' + pageString;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const guitarsData = (await resp.json()) as GuitarServerResponse;

    return guitarsData;
  }

  async readId(
    token: string,
    idGuitar: GuitarStructure['id']
  ): Promise<GuitarServerResponse> {
    const url = this.url + '/details/' + idGuitar;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const guitarData = (await resp.json()) as GuitarServerResponse;

    return guitarData;
  }

  async create(
    token: string,
    infoGuitar: Partial<GuitarStructure>
  ): Promise<GuitarServerResponse> {
    const url = this.url + '/create';

    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(infoGuitar),
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const guitarData = (await resp.json()) as GuitarServerResponse;

    return guitarData;
  }

  async update(
    token: string,
    idGuitar: GuitarStructure['id'],
    infoGuitar: Partial<GuitarStructure>
  ): Promise<GuitarServerResponse> {
    const url = this.url + '/edit/' + idGuitar;

    const resp = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(infoGuitar),
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const guitarData = (await resp.json()) as GuitarServerResponse;

    return guitarData;
  }

  async delete(token: string, idGuitar: GuitarStructure['id']): Promise<void> {
    const url = this.url + '/delete/' + idGuitar;

    const resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);
  }
}
