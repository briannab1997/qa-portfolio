# Product Support Bug Reports

Author: Brianna Brockington  
Created: June 12, 2026  
Focus: Product support triage, customer impact, reproducibility, and developer-ready escalation notes

---

## BUG-PS-001 - Case Search Filter Returns Closed Cases in Active Queue

**Product Area:** CaseTrack customer support workspace  
**Severity:** Medium  
**Priority:** High  
**Status:** Ready for Engineering Review  
**Environment:** Chrome 126, macOS Sonoma, staging data set  
**User Role:** Support Specialist

### Summary

When a support specialist filters the case queue to show only active SLA cases, closed cases can still appear after a keyword search is applied. This creates confusion during queue review and can cause agents to spend time investigating work that is already resolved.

### Customer / Business Impact

- Agents may reopen or re-review closed cases by mistake.
- SLA queue counts become difficult to trust.
- Team leads lose confidence in dashboard filtering during workload reviews.

### Preconditions

- User is signed in as a Support Specialist.
- Case queue contains a mix of `Open`, `Pending`, and `Closed` records.
- At least one closed case contains the same customer name or keyword as an active case.

### Steps to Reproduce

1. Open the CaseTrack dashboard.
2. Select the **Active Cases** queue.
3. Enable the **SLA Watch** filter.
4. Search for a customer name that exists in both active and closed cases.
5. Review the returned case list.

### Expected Result

Only active cases matching the selected SLA filter and search term should display.

### Actual Result

Closed cases matching the search term appear in the active queue results.

### Evidence / Notes

- Issue appears only after search is applied.
- Clearing the search box returns the correct active-only queue.
- Filter chips still show **Active Cases** and **SLA Watch**, which makes the incorrect results harder to notice.

### Suspected Area

Search filtering may be running against the full case array after queue filters are applied, instead of searching within the already-filtered active case set.

### Temporary Workaround

Clear the search field and use the status filter first. If searching is required, manually confirm the case status before taking action.

### Recommended Next Step

Add a regression check confirming that keyword search preserves the active status and SLA filters before rendering results.

### Acceptance Criteria

- Closed cases do not appear when **Active Cases** is selected.
- Search results respect all active filter chips.
- Queue count matches the number of visible active records.
- Regression test covers active + SLA + keyword search together.

---

## BUG-PS-002 - Access Export Omits Pending Manager Approvals When Department Filter Is Active

**Product Area:** AccessFlow access request reporting  
**Severity:** High  
**Priority:** High  
**Status:** Needs Product / Engineering Triage  
**Environment:** Edge 126, Windows 11, staging data set  
**User Role:** Manager

### Summary

When a manager filters access requests by department and exports the request list, pending approvals are omitted from the CSV even though they are visible in the filtered table. The issue affects audit readiness because the exported report does not match the on-screen approval queue.

### Customer / Business Impact

- Managers may send incomplete access reports to compliance or IT.
- Pending approvals may be missed during access review.
- On-screen data and exported data disagree, reducing trust in the report.

### Preconditions

- User is signed in as a Manager.
- Department filter is available.
- Department has at least one `Pending Manager Approval` request.

### Steps to Reproduce

1. Open the AccessFlow request dashboard.
2. Change role/view to **Manager**.
3. Filter requests by department.
4. Confirm pending manager approvals are visible in the table.
5. Click **Export CSV**.
6. Open the downloaded CSV.

### Expected Result

The CSV should include the same filtered rows visible in the table, including pending manager approvals.

### Actual Result

The CSV excludes pending manager approval rows while still exporting approved or completed rows from the same department.

### Evidence / Notes

- The issue occurs only when the department filter is active.
- Export works as expected when no department filter is applied.
- On-screen request count does not match exported row count.

### Suspected Area

CSV export logic may be using a separate report-ready data set that excludes pending states before applying the department filter.

### Temporary Workaround

Export without the department filter, then filter the CSV manually by department until the export logic is corrected.

### Recommended Next Step

Align export data source with the visible filtered table state, then add a regression check comparing visible row count to exported row count.

### Acceptance Criteria

- Exported CSV row count matches the visible filtered table count.
- Pending manager approvals are included when visible on screen.
- Department filter applies consistently to table and export.
- Regression test covers manager role + department filter + pending approval export.
