const GCM_NAMES = {
  bccr_bcm2_0: 'BCM 2.0',
  csiro_mk3_5: 'CSIRO Mark 3.5',
  ingv_echam4: 'ECHAM 4.6',
  cccma_cgcm3_1: 'CGCM 3.1 (T47)',
  cnrm_cm3: 'CNRM CM3',
  gfdl_cm2_0: 'GFDL CM2.0',
  gfdl_cm2_1: 'GFDL CM2.1',
  ipsl_cm4: 'IPSL-CM4',
  miroc3_2_medres: 'MIROC 3.2 (medres)',
  miub_echo_g: 'ECHO-G',
  mpi_echam5: 'ECHAM5/MPI-OM',
  mri_cgcm2_3_2a: 'MRI-CGCM2.3.2',
  inmcm3_0: 'INMCM3.0',
  ukmo_hadcm3: 'UKMO HadCM3',
  ukmo_hadgem1: 'UKMO HadGEM1',
};

export function getGCMDisplayName(technicalName: string): string {
  const map = new Map(Object.entries(GCM_NAMES));
  if (map.has(technicalName)) {
    return map.get(technicalName) || '';
  }
  return technicalName;
}
