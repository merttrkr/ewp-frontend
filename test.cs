
        [Swashbuckle.Swagger.Annotations.SwaggerOperation(operationId: "spGetUniversityContactsByHeiId")]
        [AllowAnonymous, HttpPost, Route("spGetUniversityContactsByHeiId")]
        public async Task<List<Dictionary<string, object>>> spGetUniversityContactsByHeiId(string heiId)
        {
            List<Dictionary<string, object>> results = new List<Dictionary<string, object>>();

            await ErrorHandlingWrapper.ExecuteAsync(async () =>
            {
                using (SqlConnection sqlCon = new SqlConnection(CONNECTION_STRING))
                {
                    await sqlCon.OpenAsync();

                    using (SqlCommand sqlCmd = new SqlCommand("spGetUniversityContactsByHeiId", sqlCon))
                    {
                        sqlCmd.CommandType = CommandType.StoredProcedure;
                        sqlCmd.Parameters.AddWithValue("@heiId", heiId);

                        using (SqlDataReader dataReader = await sqlCmd.ExecuteReaderAsync())
                        {
                            while (await dataReader.ReadAsync())
                            {
                                Dictionary<string, object> dict = new Dictionary<string, object>();
                                dict.Add("id", (dataReader.GetValue(0) == DBNull.Value) ? null : Convert.ToInt32(dataReader.GetValue(0)));
                                dict.Add("fullName", (dataReader.GetValue(1) == DBNull.Value) ? null : dataReader.GetValue(1).ToString());
                                dict.Add("phoneNumber", (dataReader.GetValue(2) == DBNull.Value) ? null : dataReader.GetValue(2).ToString());
                                dict.Add("faxNumber", (dataReader.GetValue(3) == DBNull.Value) ? null : dataReader.GetValue(3).ToString());
                                dict.Add("email", (dataReader.GetValue(4) == DBNull.Value) ? null : dataReader.GetValue(4).ToString());
                                dict.Add("roleDescription", (dataReader.GetValue(5) == DBNull.Value) ? null : dataReader.GetValue(5).ToString());
                                results.Add(dict);
                            }
                        }
                    }
                }
            });

            return results;
        }



        [Swashbuckle.Swagger.Annotations.SwaggerOperation(operationId: "spInsertEmptyRowToBilateralAgreement")]
        [AllowAnonymous, HttpPost, Route("spInsertEmptyRowToBilateralAgreement")]
        public async void spInsertEmptyRowToBilateralAgreement(int bilateralAgreement_id)
        {
            await ErrorHandlingWrapper.ExecuteAsync(async () =>
            {
                using (SqlConnection sqlCon = new SqlConnection(CONNECTION_STRING))
                {
                    await sqlCon.OpenAsync();

                    using (SqlCommand sqlCmd = new SqlCommand("spInsertEmptyRowToBilateralAgreement", sqlCon))
                    {
                        sqlCmd.CommandType = CommandType.StoredProcedure;
                        sqlCmd.Parameters.AddWithValue("@bilateralAgreement_id", bilateralAgreement_id);
                        sqlCmd.ExecuteNonQuery();
                    }
                }
            });

        }