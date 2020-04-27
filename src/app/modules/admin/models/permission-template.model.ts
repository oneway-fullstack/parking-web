import {PermissionType} from './shared.model';

export class PermissionTemplate {
  id: number;
  template_name: string;
  template_desc: string;
  date_created: string;
  global_maps_filter: PermissionType;
  global_maps_predictive: PermissionType;
  project_maps_filter: PermissionType;
  project_maps_predictive: PermissionType;
  project_manage: PermissionType;
  project_dashboard: PermissionType;
  project_alerts: PermissionType;
  project_analytics: PermissionType;
  project_orgchart: PermissionType;
  project_assets: PermissionType;
  project_productivity: PermissionType;
  project_info: PermissionType;
  project_onstreet: PermissionType;
  project_enforcement: PermissionType;
  project_carpark: PermissionType;
  project_valet: PermissionType;
  project_taxi: PermissionType;
  global_analytics: PermissionType;
  crm_jobs_view: PermissionType;
  crm_contravention_view: PermissionType;
  hr_employee: PermissionType;
  hr_workplan: PermissionType;
  admin_rights_template: PermissionType;
  admin_users_rights: PermissionType;
  admin_credentials: PermissionType;
  global_assets: PermissionType;
  tariff_parking: PermissionType;
  tariff_enforcement: PermissionType;
  tariff_enforcement_violation: PermissionType;
  tariff_enforcement_group: PermissionType;
  tariff_enforcement_escalation: PermissionType;
  tariff_valueadded: PermissionType;
}