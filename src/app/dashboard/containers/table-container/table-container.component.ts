import { Component, Input } from '@angular/core';
import { GetProducts } from '../../context/interfaces/product.interface';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css'],
})
export class TableContainerComponent {
  @Input() products!: GetProducts[];
  @Input() theades!: string[];
  @Input() editLink!: string;
  @Input()
  openUpdate!: () => void;
  @Input()
  deleteProduct!: (id: string) => void;
}
