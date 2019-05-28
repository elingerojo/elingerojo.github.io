var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WiredBase, customElement, property, html, css } from 'wired-lib/lib/wired-base';
import { ellipse, line, rectangle } from 'wired-lib';
;
// GLOBAL CONSTANTS
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const TABLE_PADDING = 8; // pixels
const weekdays_short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const months_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let WiredCalendar = class WiredCalendar extends WiredBase {
    constructor() {
        super();
        this.elevation = 3;
        this.disabled = false;
        this.initials = false; // days of week
        this.format = (d) => {
            return months_short[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
        };
        this.firstOfMonthDate = new Date(); // Only month and year relevant
        this.fDate = undefined; // Date obj for firstdate string
        this.lDate = undefined; // Date obj for lastdate string
        this.tblColWidth = 0;
        this.tblRowHeight = 0;
        this.tblHeadHeight = 0;
        this.monthYear = '';
        this.weeks = [[]];
        // Initialize calendar element size
        this.calendarRefSize = this.getCalendarSize();
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.resizeHandler) {
            this.resizeHandler = this.debounce(this.resized.bind(this), 200, false, this);
            window.addEventListener('resize', this.resizeHandler);
        }
        setTimeout(() => this.updated());
    }
    disconnectedCallback() {
        if (super.disconnectedCallback)
            super.disconnectedCallback();
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
            delete this.resizeHandler;
        }
    }
    static get styles() {
        return css `
    :host {
      display: inline-block;
      font-family: inherit;
      position: relative;
      outline: none;
      opacity: 0;
    }

    :host(.wired-disabled) {
      opacity: 0.5 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.02);
    }

    :host(.wired-rendered) {
      opacity: 1;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    svg {
      display: block;
    }

    .calendar path {
      stroke: var(--wired-calendar-color, black);
      stroke-width: 0.7;
      fill: transparent;
    }

    .selected path {
      stroke: var(--wired-calendar-selected-color, red);
      stroke-width: 2.5;
      fill: transparent;
      transition: transform 0.05s ease;
    }

    table {
      position: relative;
      background: var(--wired-calendar-bg, white);
      border-collapse: collapse;
      font-size: inherit;
      line-height: unset;
    }

    table:focus {
      outline: none !important;
    }

    td,
    th {
        border-radius: 4px;
        text-align: center;
    }

    td.disabled {
        color: var(--wired-calendar-disabled-color, lightgray);
    }

    td.dimmed {
      color: var(--wired-calendar-dimmed-color, gray);
    }

    td.selected {
        position: absolute;
    }

    td:not(.disabled):not(.selected):hover {
        background-color: #d0d0d0;
    }

    .pointer {
      cursor: pointer;
    }

    `;
    }
    render() {
        /*
        * Template to render a one month calendar
        *
        * The template consists of one `table` and one overlay `div`.
        * The `table` consiste of two header rows plus one row for each week of the month.
        * The underlaying data is an array of weeks. Each week consist of an array of days.
        * The days are objects with `CalendarCell` interface. Each one is rendered ...
        * ... according with the boolean conditions `disabled` and `selected`.
        * Particulary, a `selected` day is rendered with its own extra overlay ...
        * ... (and svg tag) to draw over it.
        */
        return html `
    <table role="dialog"
            style="width:${this.calendarRefSize.width}px;height:${this.calendarRefSize.height}px;border:${TABLE_PADDING}px solid transparent"
            @mousedown="${this.onItemClick}"
            @touchstart="${this.onItemClick}">
      ${ /* 1st header row with calendar title and prev/next controls */''}
      <tr class="top-header" style="height:${this.tblHeadHeight}px;">
        <th id="prevCal" @click="${this.onPrevClick}"><<</th>
        <th colSpan="5">${this.monthYear}</th>
        <th id="nextCal" @click="${this.onNextClick}">>></th>
      </tr>
      ${ /* 2nd header row with the seven weekdays names (short or initials) */''}
      <tr class="header" style="height:${this.tblHeadHeight}px;">
        ${weekdays_short
            .map(d => html `<th style="width: ${this.tblColWidth};">${this.initials ? d[0] : d}</th>
            `)}
      </tr>
      ${ /* Loop thru weeks building one row `<tr>` for each week */''}
      ${this.weeks
            .map((weekDays) => html `<tr style="height:${this.tblRowHeight}px;">
              ${ /* Loop thru weeekdays in each week building one data cell `<td>` for each day */''}
              ${weekDays
            .map((d) => 
        // This blank space left on purpose for clarity
        html `${d.selected ?
            // Render "selected" cell
            html `
                            <td class="selected" value="${d.value}">
                            <div style="width: ${this.tblColWidth};line-height:${this.tblRowHeight}px">${d.text}</div>
                            <div class="overlay">
                              <svg id="svgTD" class="selected"></svg>
                            </div></td>
                        ` :
            // Render "not selected" cell
            html `
                            <td class="${d.disabled ? 'disabled' : (d.dimmed ? ' dimmed' : ' ')}"
                                value="${d.disabled ? ' ' : d.value}">${d.text}</td>
                        `}
                    `
        // This blank space left on purpose for clarity
        )}${ /* End weekdays loop */''}
            </tr>`)}${ /* End weeks loop */''}
    </table>
    <div class="overlay">
      <svg id="svg" class="calendar"></svg>
    </div>
    `;
    }
    firstUpdated() {
        this.setAttribute('role', 'dialog');
        // Define an initial reference date either from a paramenter or new today date
        let d;
        // TODO: Validate `this.selected`
        if (this.selected) {
            // TODO: Validate `this.selected`
            d = new Date(this.selected);
            this.value = { date: new Date(this.selected), text: this.selected };
        }
        else {
            d = new Date();
            // Commented to avoid uninteded today date selection
            // this.selected = this.format(d);
        }
        // Define a reference date used to build one month calendar
        this.firstOfMonthDate = new Date(d.getFullYear(), d.getMonth(), 1);
        // Convert string paramenters (when present) to Date objects
        // TODO: Validate `this.firstdate`
        if (this.firstdate)
            this.fDate = new Date(this.firstdate);
        // TODO: Validate `this.lastdate`
        if (this.lastdate)
            this.lDate = new Date(this.lastdate);
        this.computeCalendar();
        this.refreshSelection();
    }
    updated(changed) {
        if (changed && changed instanceof Map) {
            if (changed.has('disabled'))
                this.refreshDisabledState();
            if (changed.has('selected'))
                this.refreshSelection();
        }
        // Redraw calendar sketchy bounding box
        const svg = this.shadowRoot.getElementById('svg');
        while (svg.hasChildNodes()) {
            svg.removeChild(svg.lastChild);
        }
        const s = this.getCalendarSize();
        const elev = Math.min(Math.max(1, this.elevation), 5);
        const w = s.width + ((elev - 1) * 2);
        const h = s.height + ((elev - 1) * 2);
        svg.setAttribute('width', `${w}`);
        svg.setAttribute('height', `${h}`);
        rectangle(svg, 2, 2, s.width - 4, s.height - 4);
        for (let i = 1; i < elev; i++) {
            (line(svg, (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), s.height - 4 + (i * 2))).style.opacity = `${(85 - (i * 10)) / 100}`;
            (line(svg, s.width - 4 + (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), i * 2)).style.opacity = `${(85 - (i * 10)) / 100}`;
            (line(svg, (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), s.height - 4 + (i * 2))).style.opacity = `${(85 - (i * 10)) / 100}`;
            (line(svg, s.width - 4 + (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), i * 2)).style.opacity = `${(85 - (i * 10)) / 100}`;
        }
        // Redraw `selected` cell
        const svgTD = this.shadowRoot.getElementById('svgTD');
        if (svgTD) {
            while (svgTD.hasChildNodes()) {
                svgTD.removeChild(svgTD.lastChild);
            }
            const iw = Math.max(this.tblColWidth * 1.0, 20);
            const ih = Math.max(this.tblRowHeight * 0.9, 18);
            const c = ellipse(svgTD, this.tblColWidth / 2, this.tblRowHeight / 2, iw, ih);
            svgTD.appendChild(c);
        }
        this.classList.add('wired-rendered');
    }
    setSelectedDate(formatedDate) {
        // TODO: Validate `formatedDate`
        this.selected = formatedDate;
        if (this.selected) {
            const d = new Date(this.selected);
            this.firstOfMonthDate = new Date(d.getFullYear(), d.getMonth(), 1);
            this.computeCalendar();
            this.requestUpdate();
            this.fireSelected();
        }
    }
    /* private methods */
    refreshSelection() {
        // Loop thru all weeks and thru all day in each week
        this.weeks.forEach((week) => week.forEach((day) => {
            // Set calendar day `selected` according to user's `this.selected`
            day.selected = this.selected && (day.value === this.selected) || false;
        }));
        this.requestUpdate();
    }
    resized() {
        // Reinitialize calendar element size
        this.calendarRefSize = this.getCalendarSize();
        this.computeCalendar();
        this.refreshSelection();
    }
    getCalendarSize() {
        const limits = this.getBoundingClientRect();
        return {
            width: limits.width > 180 ? limits.width : 320,
            height: limits.height > 180 ? limits.height : 320
        };
    }
    computeCellsizes(size, rows) {
        const numerOfHeaderRows = 2;
        const headerRealStateProportion = 0.25; // 1 equals 100%
        const borderSpacing = 2; // See browser's table {border-spacing: 2px;}
        this.tblColWidth = (size.width / 7) - borderSpacing; // A week has 7 days
        this.tblHeadHeight =
            (size.height * headerRealStateProportion / numerOfHeaderRows) - borderSpacing;
        this.tblRowHeight =
            (size.height * (1 - headerRealStateProportion) / rows) - borderSpacing;
    }
    refreshDisabledState() {
        if (this.disabled) {
            this.classList.add('wired-disabled');
        }
        else {
            this.classList.remove('wired-disabled');
        }
        this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
    }
    onItemClick(event) {
        event.stopPropagation();
        let sel = event.target;
        // No attribute 'value' means: is a disabled date (should not be 'selected')
        if (sel && sel.hasAttribute('value')) {
            this.selected = sel.getAttribute('value') || undefined;
            this.refreshSelection();
            this.fireSelected();
        }
    }
    fireSelected() {
        if (this.selected) {
            this.value = { date: new Date(this.selected), text: this.selected };
            this.fireEvent('selected', { selected: this.selected });
        }
    }
    computeCalendar() {
        // Compute month and year for table header
        this.monthYear = months[this.firstOfMonthDate.getMonth()] + " " + this.firstOfMonthDate.getFullYear();
        // Compute all month dates (one per day, 7 days per week, all weeks of the month)
        const first_day_in_month = new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth(), 1);
        // Initialize offset (negative because calendar commonly starts few days before the first of the month)
        let dayInMonthOffset = 0 - first_day_in_month.getDay();
        const amountOfWeeks = Math.ceil((new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth() + 1, 0).getDate() - dayInMonthOffset) / 7);
        this.weeks = []; // Clear previous weeks
        for (let weekIndex = 0; weekIndex < amountOfWeeks; weekIndex++) {
            this.weeks[weekIndex] = [];
            for (let dayOfWeekIndex = 0; dayOfWeekIndex < 7; dayOfWeekIndex++) {
                // Compute day date (using an incrementing offset)
                const day = new Date(first_day_in_month.getTime() + DAY * dayInMonthOffset);
                let formatedDate = this.format(day);
                this.weeks[weekIndex][dayOfWeekIndex] = {
                    value: formatedDate,
                    text: day.getDate().toString(),
                    selected: formatedDate === this.selected,
                    dimmed: day.getMonth() != first_day_in_month.getMonth(),
                    disabled: this.isDateOutOfRange(day)
                };
                // Increment offset (advance one day in calendar)
                dayInMonthOffset++;
            }
        }
        // Compute row and column sizes
        this.computeCellsizes(this.calendarRefSize, amountOfWeeks);
    }
    onPrevClick() {
        // Is there a preious month limit due to `firstdate`?
        if (this.fDate == undefined ||
            new Date(this.fDate.getFullYear(), this.fDate.getMonth() - 1, 1).getMonth() !=
                new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth() - 1, 1).getMonth()) {
            // No limit found, so update `firstOfMonthDate` to first of the previous month
            this.firstOfMonthDate = new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth() - 1, 1);
            this.computeCalendar();
            this.refreshSelection();
        }
    }
    onNextClick() {
        // Is there a next month limit due to `lastdate`?
        if (this.lDate == undefined ||
            new Date(this.lDate.getFullYear(), this.lDate.getMonth() + 1, 1).getMonth() !=
                new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth() + 1, 1).getMonth()) {
            // No limit found, so update `firstOfMonthDate` to first of the next month
            this.firstOfMonthDate = new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth() + 1, 1);
            this.computeCalendar();
            this.refreshSelection();
        }
    }
    /** Compute if date should be render as disabled in present month calendar.
      *
      * Disable days from previous month that could appear at the first week start.
      * Disable days from next month that could appear at last week end.
      * Disable any previous days from `firstdate` when present.
      * Disable any following days from `lastdate` when present.
      *
      * Return `true` means: render as disabled.
      * Note that `return true` happens in the `else` clause (this is like ...
      * ...negated logic).
      */
    isDateOutOfRange(day) {
        /*
        if (day.getMonth() == this.firstOfMonthDate.getMonth() && ( // Is same month?
            this.fDate == undefined ? true : ( // Is there fistdate?
                day.getMonth() == this.fDate.getMonth() ? ( // If so, is same month?
                    day.getFullYear() == this.fDate.getFullYear() ? // ...and same year?
                        day.getDate() >= this.fDate.getDate() : true // ... greather day?
                ) : true
            )
        ) && (
            this.lDate == undefined ? true : (
                day.getMonth() == this.lDate.getMonth() ? (
                    day.getFullYear() == this.lDate.getFullYear() ?
                        day.getDate() <= this.lDate.getDate() : true
                ) : true
            )
        )) {
             return false;
        } else return true;
        */
        if (this.fDate && this.lDate) {
            return day < this.fDate || this.lDate < day;
        }
        else if (this.fDate) {
            return day < this.fDate;
        }
        else if (this.lDate) {
            return this.lDate < day;
        }
        return false;
    }
    /* Util */
    debounce(func, wait, immediate, context) {
        let timeout = 0;
        return () => {
            const args = arguments;
            const later = () => {
                timeout = 0;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = window.setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }
};
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredCalendar.prototype, "elevation", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredCalendar.prototype, "selected", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredCalendar.prototype, "firstdate", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredCalendar.prototype, "lastdate", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredCalendar.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredCalendar.prototype, "initials", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], WiredCalendar.prototype, "value", void 0);
__decorate([
    property({ type: Function }),
    __metadata("design:type", Function)
], WiredCalendar.prototype, "format", void 0);
WiredCalendar = __decorate([
    customElement('wired-calendar'),
    __metadata("design:paramtypes", [])
], WiredCalendar);
export { WiredCalendar };
