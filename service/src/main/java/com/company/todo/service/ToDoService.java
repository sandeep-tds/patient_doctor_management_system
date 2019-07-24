package com.company.todo.service;

import java.sql.Connection;

import java.util.*;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sap.cloud.sdk.hana.connectivity.cds.CDSQuery;
import com.sap.cloud.sdk.hana.connectivity.cds.CDSSelectQueryBuilder;
import com.sap.cloud.sdk.hana.connectivity.cds.CDSSelectQueryResult;

import com.sap.cloud.sdk.hana.connectivity.handler.CDSDataSourceHandler;
import com.sap.cloud.sdk.hana.connectivity.handler.DataSourceHandlerFactory;

import com.sap.cloud.sdk.service.prov.api.EntityData;
import com.sap.cloud.sdk.service.prov.api.operations.Query;
import com.sap.cloud.sdk.service.prov.api.operations.Read;
import com.sap.cloud.sdk.service.prov.api.request.QueryRequest;
import com.sap.cloud.sdk.service.prov.api.request.ReadRequest;
import com.sap.cloud.sdk.service.prov.api.response.QueryResponse;
import com.sap.cloud.sdk.service.prov.api.response.ReadResponse;
import com.sap.cloud.sdk.service.prov.api.operations.*;
import com.sap.cloud.sdk.service.prov.api.response.*;
import com.sap.cloud.sdk.service.prov.api.request.*;

/**
 *
 * @author I059508
 */
public class ToDoService {

	private static Logger logger = LoggerFactory.getLogger(ToDoService.class);
	private static List<Map<String, Object>> peopleList = null;

	@Query(entity = "SPORT", serviceName = "todo")
	public QueryResponse findSports(QueryRequest request) {
		try {
			QueryResponse res = QueryResponse.setSuccess().setEntityData(getEntitySet(request)).response();
			return res;
		} catch (Exception e) {
			return null;
		}
	}

	@Read(entity = "SPORT", serviceName = "todo")
	public ReadResponse getProposedSport(ReadRequest readRequest) {
		try {
			ReadResponse readResponse = ReadResponse.setSuccess().setData(readEntity(readRequest)).response();
			return readResponse;
		} catch (Exception e) {
			return null;
		}
	}

	@Create(serviceName = "todo", entity = "USER")
	public CreateResponse createPerson(CreateRequest request) {

		// extract the data for creation
		Map<String, Object> requestBody = request.getMapData();
		Integer id = (Integer) requestBody.get("USER_ID"); // we know it is an int, because we know the edmx
		String lastname = (String) requestBody.get("USER_NAME"); // same here
		String firstname = (String) requestBody.get("USER_FIRST_NAME");
		String mail = (String) requestBody.get("MAIL");
		String hash = (String) requestBody.get("HASH");
		Integer status = (Integer) requestBody.get("STATUS");
		String profession = (String) requestBody.get("PROFESSION");
		String qualite = (String) requestBody.get("QUALITE");
		String institut = (String) requestBody.get("INSTITUT_RATTACHEMENT");
		Integer cartePro = (Integer) requestBody.get("NUMERO_CARTE_PRO");
		Integer siret = (Integer) requestBody.get("NUMERO_SIRET");
		Integer practicien = (Integer) requestBody.get("NUMERO_PRACTICIEN");
		String lieuSport = (String) requestBody.get("LIEU_EXERCICE");
		

		// do the actual creation in database
		createPerson(id, lastname, firstname, mail, hash, status, profession, qualite, institut, cartePro, siret,
				practicien, lieuSport);

		return CreateResponse.setSuccess().response();
	}

	@Query(entity = "USER", serviceName = "todo")
	public QueryResponse findTasks(QueryRequest request) {
		try {
			QueryResponse res = QueryResponse.setSuccess().setEntityData(getEntitySet(request)).response();
			return res;
		} catch (Exception e) {
			return null;
		}
	}

	@Read(entity = "USER", serviceName = "todo")
	public ReadResponse getProposedBooks(ReadRequest readRequest) {
		try {
			ReadResponse readResponse = ReadResponse.setSuccess().setData(readEntity(readRequest)).response();
			return readResponse;
		} catch (Exception e) {
			return null;
		}
	}

	@Query(entity = "CONSIGNE", serviceName = "todo")
	public QueryResponse findConsigne(QueryRequest request) {
		try {
			QueryResponse res = QueryResponse.setSuccess().setEntityData(getEntitySet(request)).response();
			return res;
		} catch (Exception e) {
			return null;
		}
	}

	@Read(entity = "CONSIGNE", serviceName = "todo")
	public ReadResponse getProposedConsignes(ReadRequest readRequest) {
		try {
			ReadResponse readResponse = ReadResponse.setSuccess().setData(readEntity(readRequest)).response();
			return readResponse;
		} catch (Exception e) {
			return null;
		}
	}

	private List<EntityData> getEntitySet(QueryRequest queryRequest) {
		String fullQualifiedName = queryRequest.getEntityMetadata().getNamespace() + "."
				+ queryRequest.getEntityMetadata().getName();
		CDSDataSourceHandler dsHandler = DataSourceHandlerFactory.getInstance().getCDSHandler(getConnection(),
				queryRequest.getEntityMetadata().getNamespace());
		try {
			CDSQuery cdsQuery = new CDSSelectQueryBuilder(fullQualifiedName).build();
			CDSSelectQueryResult cdsSelectQueryResult = dsHandler.executeQuery(cdsQuery);

			return cdsSelectQueryResult.getResult();
		} catch (Exception e) {
			logger.error("==> Eexception while fetching query data from CDS: " + e.getMessage());
			e.printStackTrace();
		}
		return null;
	}

	private EntityData readEntity(ReadRequest readRequest) throws Exception {
		CDSDataSourceHandler dsHandler = DataSourceHandlerFactory.getInstance().getCDSHandler(getConnection(),
				readRequest.getEntityMetadata().getNamespace());
		EntityData ed = dsHandler.executeRead(readRequest.getEntityMetadata().getName(), readRequest.getKeys(),
				readRequest.getEntityMetadata().getElementNames());
		return ed;
	}

	private static Connection getConnection() {
		Connection conn = null;
		Context ctx;
		try {
			ctx = new InitialContext();
			conn = ((DataSource) ctx.lookup("java:comp/env/jdbc/java-hdi-container")).getConnection();
			System.out.println("conn = " + conn);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}

	private void createPerson(Integer id, String lastname, String firstname, String mail, String hash, Integer status,
			String profession, String qualite, String institut, Integer cartePro, Integer siret, Integer practicien,
			String lieuSport) {
		Map<String, Object> personMap = new HashMap<String, Object>();
		personMap.put("USER_ID", id);
		personMap.put("USER_NAME", lastname);
		personMap.put("USER_FIRST_NAME", firstname);
		personMap.put("MAIL", mail);
		personMap.put("HASH", hash);
		personMap.put("STATUS", status);
		personMap.put("PROFESSION", profession);
		personMap.put("QUALITE", qualite);
		personMap.put("INSTITUT_RATTACHEMENT", institut);
		personMap.put("NUMERO_CARTE_PRO", cartePro);
		personMap.put("NUMERO_SIRET", siret);
		personMap.put("NUMERO_PRACTICIEN", practicien);
		personMap.put("LIEU_EXERCICE", lieuSport);

		peopleList.add(personMap);
	}
}
