import React from 'react';
import classes from './TableFooter.css';

const tableFooter = props => (
  <tfoot>
    <tr className={classes.TableFooter}>
      <td colSpan="3" className={classes.TableFooterCell}>
        <span>Rows per page:</span>
        <span className={classes.TableSelect}>
          <select
            onChange={props.chosePagination}
            defaultValue={props.rowsPerPage}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </span>
        <span>{props.status}</span>
        <span>
          <button
            className={classes.FooterButon}
            onClick={() => props.changePage(false)}>
            {'<'}
          </button>
        </span>
        <span>
          <button
            className={classes.FooterButon}
            onClick={() => props.changePage(true)}>
            {'>'}
          </button>
        </span>
      </td>
    </tr>
  </tfoot>
);

export default tableFooter;
