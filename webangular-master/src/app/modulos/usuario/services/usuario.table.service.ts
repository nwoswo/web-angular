import {Injectable, PipeTransform} from '@angular/core';


import {BehaviorSubject, Observable, of, Subject} from 'rxjs';



import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from './sortable.directive';
import { GsecUsuario } from 'src/app/model/gsecUsuario';
import { UsuarioService } from './usuario.service';



interface SearchResult {
    usuariosi: GsecUsuario[];
    ttotal: number;
  }

  interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
  }


  function compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }


function sort(countries: GsecUsuario[], column: string, direction: string): GsecUsuario[] {



    if (direction === '') {
      return countries;
    } else {
      return [...countries].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  function matches(usuario: GsecUsuario, term: string, pipe: PipeTransform) {
   let term2 = term.toUpperCase();

    return usuario.usuDUsuario.includes(term2)
      || usuario.shorttraDNombre.includes(term2)
      || usuario.gpecPersona.traNNrodoc.includes(term2)
      || usuario.gpecPersona.traDNombres.includes(term2);
  }



@Injectable()
export class UsuarioTableService {

    public lusuarios: GsecUsuario[] = [];

    private _loading$ = new BehaviorSubject<boolean>(true);
    public _search$ = new Subject<void>();
    private _countries$ = new BehaviorSubject<GsecUsuario[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
      page: 1,
      pageSize: 4,
      searchTerm: '',
      sortColumn: '',
      sortDirection: ''
    };

    constructor(private pipe: DecimalPipe,private service: UsuarioService) {
        this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._countries$.next(result.usuariosi);
          this._total$.next(result.ttotal);
        });

        this._search$.next();

        this.getUsuarios();
      }

      public  getUsuarios() {


        this.service.getUsuarios().subscribe(
          usuarios => {
            this.lusuarios = usuarios;
          },

        );



      }

      get usuarioshort$() { return this._countries$.asObservable(); }
      get total$() { return this._total$.asObservable(); }
      get loading$() { return this._loading$.asObservable(); }
      get page() { return this._state.page; }
      get pageSize() { return this._state.pageSize; }
      get searchTerm() { return this._state.searchTerm; }

      set page(page: number) { this._set({page}); }
      set pageSize(pageSize: number) { this._set({pageSize}); }
      set searchTerm(searchTerm: string) { this._set({searchTerm}); }
      set sortColumn(sortColumn: string) { this._set({sortColumn}); }
      set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

      private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
      }


      public _search(): Observable<SearchResult> {



        const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

        // 1. sort

        let usuariosi = sort(this.lusuarios, sortColumn, sortDirection);

        // 2. filter
        usuariosi = usuariosi.filter(country => matches(country, searchTerm, this.pipe));
        const ttotal = usuariosi.length;

        // 3. paginate
        usuariosi = usuariosi.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({usuariosi, ttotal});
      }

}
